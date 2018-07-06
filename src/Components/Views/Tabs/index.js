import { Navigation } from 'react-native-navigation';

//icons required for android tabs
import falseIcon from '../../../Assets/circle.png';


import Icon from 'react-native-vector-icons/FontAwesome';


const navStyle = {
    navBarTextFontSize:20,
    navBarTexColor: '#123123',
    navBarTextFontFamily: 'RobotoCondensed-Bold',
    navBarTitleTextCentered: true, //android only
    navBarBackgroundColor: '#00ADA9'
}

const navLeftButton = (sources) => {
    return {
        title: 'Drawer',
        id: 'DrawerButton',
        icon: sources[0],
        //disables automatic icon color of the device
        disableIconTint: true,
        buttonColor: 'white'
    }
}

//all logic for creating tabs
const LoadTabs = (allow) => {

    //all has to be done before it goes further
    Promise.all([
        Icon.getImageSource('bars',20,'white'),
        Icon.getImageSource('dollar',20,'white'),
        Icon.getImageSource('search',20,'white')
    ]).then((sources)=>{
        Navigation.startTabBasedApp({
            //objects here are tabs
            tabs: [
                {
                    //same name as before project.name
                    screen:"sellItApp.Home",
                    label:"Home",
                    title:"Home Title",
                    //android needs it 
                    icon:sources[2],
                    navigatorStyle:navStyle,
                    navigatorButtons:{
                        leftButtons: [navLeftButton(sources)]
                    }
                },
                {
                    //same name as before project.name
                    screen: allow ? "sellItApp.AddPost" : "sellItApp.NotAllow",
                    label:"Add Post Sell It",
                    title:"Add Post Sell It Title",
                    //android needs it 
                    icon:sources[1],
                    navigatorStyle:navStyle,
                    navigatorButtons:{
                        leftButtons: [navLeftButton(sources)]
                    }

                }
            ],
            tabsStyle: {
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#FFC636',
                tabBarTextFontFamily: 'RobotoCondensed-Bold',
                tabBarBackgroundColor: 'white',
                //no opacity
                tabBarTranslucent: false
            },
            appStyle:{
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#FFC636',
                tabBarTextFontFamily: 'RobotoCondensed-Bold',
                tabBarBackgroundColor: 'white',
                navBarButtonColor: '#ffffff',
                keepStyleAcrossPush: true
            },
            drawer: {
                left:{
                    screen: "sellItApp.Sidedrawer",
                    fixedWidth: 700
                }
            }
        })
    })


}

export default LoadTabs;