import { Navigation } from 'react-native-navigation';


import LoginComponent from './src/Login';
import HomeComponent from './src/Home';
import AddPostComponent from './src/AddPost';

//in string value we pass whatever we want, but by 
//convention it would be projectName.componentName
Navigation.registerComponent("sellItApp.Login", ()=>LoginComponent);
Navigation.registerComponent("sellItApp.Home", ()=>HomeComponent);
Navigation.registerComponent("sellItApp.AddPost", ()=>AddPostComponent);



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
