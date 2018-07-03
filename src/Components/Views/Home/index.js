import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../Store/Actions/articles_actions';

import { navigatorDrawer, navigatorDeepLink, gridTwoColumns } from '../../Utils/misc'
import HorizontalScroll from './horizontal_scroll_icons';

import Icon from 'react-native-vector-icons/FontAwesome';

class HomeComponent extends Component {

  

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      articles:[],
      categories:['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
      categorySelected: 'All'
    }
    //this accesses event in navigator
    this.props.navigator.setOnNavigatorEvent((event)=>{
      navigatorDeepLink(event, this);
      navigatorDrawer(event, this);
    });
  }

  updateCategoryHandler = (value) => {
    this.setState({
      categorySelected:value
    })
  }

  componentDidMount(){
    this.props.getArticles('All').then(()=>{
      console.log(this.props.Articles.list)

      const newArticles = gridTwoColumns(this.props.Articles.list);

      console.log(newArticles);

      this.setState({
        isLoading: false,
        articles: newArticles
      })
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll 
             categories={this.state.categories}
             categorySelected={this.state.categorySelected}
             updateCategoryHandler={this.updateCategoryHandler}
          />

          {
            this.state.isLoading ?
            <View style={styles.isLoading}>
              <Icon name="gears" size={30} color="lightgrey"/>
              <Text style={{color:'lightgrey'}}>Loading...</Text>
            </View> 
            : null
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 5
  },
  isLoading:{
    flex:1,
    alignItems: 'center',
    marginTop: 50
  }
});

function mapStateToProps(state){
  console.log(state)
  return {
    Articles: state.Articles
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getArticles},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);