import React, { Component } from 'react';
import { StyleSheet, Text, View,
  ScrollView, Button } from 'react-native';

import { getOrientation, setOrientationListener, removeOrientationListener } from '../../Utils/misc';

import LoadTabs from '../Tabs';
import Logo from './logo';

class LoginComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      // jesli jest wieksze/mniejsze od tego to zmieni orientacje obrazu
      orientation: getOrientation(500)
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

  render() {
    return (
      <ScrollView>
          <View style={styles.container}>
            <Logo 
              orientation={this.state.orientation}
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