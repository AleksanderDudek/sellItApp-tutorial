import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

class SidedrawerComponent extends Component {

    state = {
        buttons: [
            {
                value: 'Home',
                iconName: 'home',
                shouldGoto: 'sellItApp.Home',
                typeLink: 'tab',
                index: 0,
                privacy: false
            },
            {
                value: 'Sell',
                iconName: 'dollar',
                shouldGoto: 'sellItApp.AddPost',
                typeLink: 'tab',
                index: 1,
                privacy: false
            },
            {
                value: 'MyPosts',
                iconName: 'th-list',
                shouldGoto: 'sellItApp.UserPosts',
                typeLink: 'view',
                index: null,
                privacy: true
            }
        ]
    }

    button = (button) => (
        <Icon.Button
            key={button.value}
            name={button.iconName}
            backgroundColor='#474143'
            iconStyle={{width:15}}
            color='#ffffff'
            size={18}
            onPress={()=>{
                this.props.navigator.handleDeepLink({
                    link: button.shouldGoto,
                    payload:{
                        typeLink: button.typeLink,
                        indexLink: button.index
                    }
                })
            }}
        >   
            <Text style = {styles.button}> 
                {button.value}
            </Text>
        </Icon.Button> 
    )

    showButtons = (buttons) => (
        
        buttons.map( button => (
        !button.privacy ?
        this.button(button)
        :
        this.props.User.userData ? 
            this.button(button) : null
    ))
    )


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    {this.showButtons(this.state.buttons)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#474143'
    },
    buttonContainer:{
        padding: 10,
        marginTop: 20
    },
    button:{
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: '#ffffff'
    }
});

function mapStateToProps(state){

    console.log(state)
    return {
        User: state.User
    }
}

export default connect(mapStateToProps, null)(SidedrawerComponent);

