import React, { Component } from 'react';
import { StyleSheet, Text, View,
  ScrollView, Button } from 'react-native';

import { 
  getOrientation, 
  setOrientationListener, 
  removeOrientationListener,
  getPlatform
} from '../../Utils/misc';
import LoginPanel from './loginPanel';

import LoadTabs from '../Tabs';
import Logo from './logo';

class LoginComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      // jesli jest wieksze/mniejsze od tego to zmieni orientacje obrazu
      platform: getPlatform(),
      orientation: getOrientation(500),
      logoAnimation:false
    }

    setOrientationListener(this.changeOrientation)
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    })
  }

  componentWillUnmount() {
    removeOrientationListener();
  }

  showLogin = () => {
    this.setState({
      logoAnimation:true
    })
  }

  render() {
    return (
      <ScrollView>
          <View style={styles.container}>
            <Logo 
              showLogin={this.showLogin}
              orientation={this.state.orientation}
            />
            
          </View>
          <View style={styles.container}>
          <LoginPanel 
            show={this.state.logoAnimation}
            orientation={this.state.orientation}
            platform={this.state.platform}
            />
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#fff",
    alignItems: 'center'
    }
});

export default LoginComponent;