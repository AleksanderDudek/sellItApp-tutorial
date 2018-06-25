import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Input from '../../Utils/forms/inputs';
import Validation from '../../Utils/forms/validationRules';
import LoadTabs from '../Tabs';

import { connect } from 'react-redux';
import { signUp } from '../../Store/Actions/user_actions';
import { bindActionCreators } from 'redux';

class LoginForm extends Component {


    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'Not a user, Register',
        hasErrors:false,
        form:{
            email:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    isEmail:true
                }
            },
            password:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    minLength:6
                }
            },
            confirmPassword:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    confirmPass:"password"
                }
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors:false
        })

        //copy of form's state made not to 
        //mutate original state
        let formCopy = this.state.form;
        //copy's update
        formCopy[name].value = value;


        let rules = formCopy[name].rules;
        let valid = Validation(rules, value, formCopy);

        formCopy[name].valid = valid;

        console.log(valid);
        //why then copying form here?? 
        this.setState({
            form:formCopy
        })
    }

    confirmPassword = () => (
    this.state.type != 'Login' ? 
        <Input 
            placeholder="Confirm your password"
            type={this.state.form.confirmPassword.type}
            value={this.state.form.confirmPassword.value}
            onChangeText={value => this.updateInput("confirmPassword", value)}
            secureTextEntry
        />
    :null
    )

    changeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'Not registered, Login' : 'Not a user, Register'

        })
    }

    submitUser = () => {

        console.log('in submit')
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for(let key in formCopy){

            if(this.state.type === 'Login'){
                if(key != 'confirmPassword'){
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if(isFormValid){
            console.log(formToSubmit)

            if(this.state.type === "Login")
            {

            } else {
                this.props.signUp(formToSubmit).then(()=>{
                    console.log(this.props.User)
                    return true;
                })
            }
               

        } else {
            console.log("invalid")

            this.setState({
                hasErrors:true
            })
        }
    }

    //watch out for parentesis!!! use () instead of {} if you only return sth
    formHasErrors = () => (
        this.state.hasErrors ? 
          <View style={styles.errorContainer}>
              <Text style={styles.errorLabel}> Oops, some errors! </Text>
          </View>  
        : null
    )
        
        
   

    render(){
        return(
            <View style={styles.formInputContainer}>
                <Input 
                    placeholder="Enter your email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={value => this.updateInput("email", value)}
                    autoCapitalize={"none"}
                    keywordType={"email-address"}
                />

                <Input 
                    placeholder="Enter your password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput("password", value)}
                    secureTextEntry
                />

                {this.confirmPassword()}
                {this.formHasErrors()}

                <View style={
                    this.props.platform === "android"
                    ? styles.buttonStyleAndroid
                    : styles.buttonStyleIos
                }>
                    <Button 
                        title={this.state.action}
                        color="#fd9727"
                        onPress={this.submitUser}
                    />
                </View>
                <View style={{
                    marginBottom: 10
                }}>
                    <Button 
                        title={this.state.actionMode}
                        color="lightgrey"
                        onPress={this.changeFormType}
                    />
                </View>
                <View>
                    <Button 
                        title="I'll do it later"
                        color="lightgrey"
                        onPress={()=> LoadTabs()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formInputContainer: {
        minHeight: 400
    },
    buttonStyleAndroid: {
        marginBottom: 15,
        marginTop: 10
    },
    buttonStyleIos: {
        marginBottom: 0
    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel: {
        color:'red',
        fontFamily: 'Roboto-Black'
    }
})

//needed for redux

function mapStateToProps(state){
    return{
        User: state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp},dispatch);
}

// export default LoginForm;
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);