import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import LoadTabs from '../Tabs';

class LoginComponent extends Component {
  render() {
    return (
      <View>
        <Button
        title="got ot home"
        onPress={()=>{
          LoadTabs();
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export default LoginComponent;