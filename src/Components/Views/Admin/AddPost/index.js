import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { navigatorDrawer } from '../../../Utils/misc';

class AddPostComponent extends Component {

  constructor(props){
    super(props);

    //this accesses event in navigator
    this.props.navigator.setOnNavigatorEvent((event)=>{
      navigatorDrawer(event, this)
    });
  }

  render() {
    return (
      <Text>I am add post</Text>
    );
  }
}

const styles = StyleSheet.create({
});

export default AddPostComponent;