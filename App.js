import { Navigation } from 'react-native-navigation';
import ConfigStore from './src/Components/Store/config'
//bridge between store and react 

import { Provider } from 'react-redux';

import LoginComponent from './src/Components/Views/Login';
import HomeComponent from './src/Components/Views/Home';
import AddPostComponent from './src/Components/Views/Admin/AddPost';
import SidedrawerComponent from './src/Components/Views/Sidedrawer';
import UserPostsComponent from './src/Components/Views/Admin/UserPosts';
import ArticleComponent from './src/Components/Views/Article';
import NotAllowComponent from './src/Components/Views/Admin/AddPost/noallow';

const store = ConfigStore();

//in string value we pass whatever we want, but by 
//convention it would be projectName.componentName
Navigation.registerComponent(
    "sellItApp.Login", 
    ()=>
    LoginComponent, 
    store, 
    Provider);

Navigation.registerComponent(
    "sellItApp.Home",
    ()=>
    HomeComponent,
    store, 
    Provider);

Navigation.registerComponent(
    "sellItApp.AddPost",
    ()=>
    AddPostComponent,
    store, 
    Provider);    

Navigation.registerComponent(
    "sellItApp.Sidedrawer",
    ()=>
    SidedrawerComponent,
    store, 
    Provider);

Navigation.registerComponent(
    "sellItApp.UserPosts",
    ()=>
    UserPostsComponent,
    store, 
    Provider);

Navigation.registerComponent(
    "sellItApp.Article",
    ()=>
    ArticleComponent,
    store, 
    Provider);  

Navigation.registerComponent(
    "sellItApp.NotAllow",
    ()=>
    NotAllowComponent,
    store, 
    Provider);

//we need to export default start-up function 
//this is where we decide what sort of architecture
//we choose (single screen / tab based app) 
export default () => Navigation.startSingleScreenApp({
    screen:{
        screen:"sellItApp.Login",
        title:"Login",
        navigatorStyle:{
            navBarHidden:true
        }
    }
})

//old component, default

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
