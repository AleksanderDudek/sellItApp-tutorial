import React, { Component } from 'react';
import { StyleSheet, Text, View,
   Button, ScrollView, Modal } from 'react-native';

import { navigatorDrawer, getTokens, setTokens } from '../../../Utils/misc';

import Input from '../../../Utils/forms/inputs';
import Validation from '../../../Utils/forms/validationRules';

import { connect } from 'react-redux';
import { addArticle, resetArticle } from '../../../Store/Actions/articles_actions';
import { autoSignIn } from '../../../Store/Actions/user_actions';
import { bindActionCreators } from 'redux';

class AddPostComponent extends Component {

  constructor(props){
    super(props);

    //this accesses event in navigator
    this.props.navigator.setOnNavigatorEvent((event)=>{
      navigatorDrawer(event, this)
    });
  }

  state = {
    errorsArray:[],
    loading:false,
    hasErrors:false,
    modalVisible:false,
    modalSuccess:false,
    form:{
        category:{
            value:"",
            name:"category",
            valid:false,
            type:"picker",
            options:['Select a category','Sports', 'Music', 'Clothing', 'Electronics'],
            rules:{
                isRequired:true,
            },
            errorMsg:"You need to select a category"
        },
        title:{
          value:"",
            name:"title",
            valid:false,
            type:"textinput",
            rules:{
              isRequired: true,
              maxLength: 40,
              minLength: 10
            },
            errorMsg:"You need to enter a title, max of 50 characters"
        
        },
        description:{
          value:"",
          name:"description",
          valid:false,
          type:"textinput",
          rules:{
            isRequired: true,
            maxLength: 200,
            minLength: 80
          },
          errorMsg:"You need to enter description 80-200 charcters"
      
        },
        price:{
          value:"",
          name:"price",
          valid:false,
          type:"textinput",
          rules:{
            isRequired: true,
            maxLength: 6
          },
          errorMsg:"You need to add maxium of 6-digit length number"
      
        },
        email:{
          value:"",
          name:"email",
          valid:false,
          type:"textinput",
          rules:{
            isRequired: true,
            isEmail: true
          },
          errorMsg:"You need to enter valid email"
      
        }


      }
  }

  updateInput = (name,value) => {
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

  submitFormHandler = () => {
      let isFormValid = true;
      let dataToSubmit = {};
      const formCopy = this.state.form;

      for(let key in formCopy){
        isFormValid = isFormValid && formCopy[key].valid;
        dataToSubmit[key] = formCopy[key].value;
      }

      if(isFormValid){

        this.setState({
          loading: true
        });

        getTokens((value) =>{
          console.log(value)
          const dateNow = new Date();
          const expiration = dateNow.getTime();
          const form = {
            ...dataToSubmit,
            uid: value[3][1]
          }

          if(expiration > value[2][1]){
            // alert('auto sign in');
            this.props.autoSignIn(value[1][1]).then(()=>{
              setTokens(this.props.User.userData, ()=>{
                this.props.addArticle(form, this.props.User.userData.token)
                .then(()=>{
                  this.setState({
                    modalSuccess: true
                  })
                })
              })
            })

          } else {
            // alert('post the article')
            console.log('just passing data')
            this.props.addArticle(form, this.props.User.userData.token)
            .then(()=>{
              this.setState({
                modalSuccess: true
              })
            })
          }

        });


        console.log(dataToSubmit)
  


      } else {
        console.log('invalid form')

        let errorsArray = [];

        for(let key in formCopy){
          if(!formCopy[key].valid){
            errorsArray.push(formCopy[key].errorMsg)
          }
        }

        console.log(errorsArray)
        this.setState({
          loading: false,
          hasErrors: true,
          errorsArray,
          modalVisible: true
        })
      }

  }

  showErrorsArray = (errors) => (
    errors ? 
      errors.map((item, i) => (
        <Text key={i} style={styles.errorItem}> - {item} </Text>
      )
  ) 
  :null
)

clearErrors = () => {
  this.setState({
    hasErrors: false,
    errorsArray: [],
    modalVisible: false
  })
}


resetSellitScreen = () => {
  const formCopy = this.state.form;

  for(let key in formCopy){
    formCopy[key].valid = false;
    formCopy[key].value = "";
  }

  this.setState({
    modalSuccess: false,
    hasErrors: false,
    errorsArray: [],
    loading: false
  })

  //dispatch action to clear the store
  this.props.resetArticle();
}
  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{flex:1, alignItems: 'center'}}>
            <Text style={styles.mainTitle}>Sell your things</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <View style={{flex:1}}>
            <Text>Select a category</Text>
          </View>
          <View style={{flex:1}}>
          <Input 
                    placeholder="Select a category"
                    type={this.state.form.category.type}
                    value={this.state.form.category.value}
                    onValueChange={value => this.updateInput("category", value)}
                    options={this.state.form.category.options}
/>
          </View>
        </View>

        <View style={{flex:1, alignItems: 'center'}}>
            <Text style={styles.secondTitle}>Describe what your are selling</Text>
        </View>

        <View>
          <Text>Please add the title, be descriptive...</Text>
          <Input 
                    placeholder="Enter a title"
                    type={this.state.form.title.type}
                    value={this.state.form.title.value}
                    onChangeText={value => this.updateInput("title", value)}
                    overrideStyle={styles.inputText}
          />
        </View>

        <View>
        {/* <Text>Please add the description, be descriptive...</Text> */}
          <Input 
                    placeholder="Enter a description"
                    type={this.state.form.description.type}
                    value={this.state.form.description.value}
                    onChangeText={value => this.updateInput("description", value)}
                    multiline={true}
                    // numberOfLines={4}
                    overrideStyle={styles.inputTextMultiline}
          />
        </View>

        <View>
          <Text style={{
            marginTop: 20,
            marginBottom: 20
          }}>Add here how much you want for the item.</Text>
          <Input 
                    placeholder="Price..."
                    type={this.state.form.price.type}
                    value={this.state.form.price.value}
                    onChangeText={value => this.updateInput("price", value)}
                    overrideStyle={styles.inputText}
                    keyboardType={"numeric"}
          />
        </View>

        <View style={{flex:1,alignItems: 'center'}}>
          <Text style={
              styles.secondTitle
            }>Add your contact data.</Text>
        </View>

        <View>
          <Text>Please enter the email where users can contact you</Text>
          <Input 
          placeholder="Enter your email..."
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput("email", value)}
          overrideStyle={styles.inputText}
          autoCapitalize={"none"}
          keyboardType={"email-address"}

          />
        </View>

{
  !this.state.loading ?
  <Button 
    title="Sell it"
    color="lightgrey"
    onPress={this.submitFormHandler}
  /> 
  : null
}

<Modal
  animationType="slide"
  visible={this.state.modalVisible}
  onRequestClose={()=>{}}
>
  <View style={{padding:20}}>
  {this.showErrorsArray(this.state.errorsArray)}
  <Button
    title="Got it!"
    onPress={this.clearErrors}
  />
  </View>

</Modal>


<Modal
  animationType="slide"
  visible={this.state.modalSuccess}
  onRequestClose={()=>{}}
>
  <View style={{padding:20}}>
    <Text>GOOOD JOOOB :) </Text>
  <Button
    title="Got it!"
    onPress={() => {
      this.resetSellitScreen();
      this.props.navigator.switchToTab({
        tabIndex:0
      })
    }}
  />
  </View>

</Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer:{
    flex:1,
    flexDirection: 'column',
    padding: 20
  },
  mainTitle:{
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    color:'#00ADA9'
  },
  secondTitle:{
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    color:'#00ADA9',
    marginTop: 30,
    marginBottom: 30
  },
  inputText:{
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    padding: 10,
  },
  inputTextMultiline:{
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    padding: 10,
    minHeight: 100,
  },
  errorItem:{
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    color:'red',
    marginBottom: 10
  }
  
});

function mapStateToProps(state){
  return{
    Articles: state.Articles,
    User: state.User
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addArticle,autoSignIn, resetArticle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostComponent);

