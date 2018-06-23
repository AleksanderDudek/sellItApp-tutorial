import React, { Component } from 'react';
import { StyleSheet, Text, View,
  ScrollView, Button } from 'react-native';

import LoadTabs from '../Tabs';
import Logo from './logo';

class LoginComponent extends Component {
  render() {
    return (
      <ScrollView>
          <View style={styles.container}>
            <Logo 

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