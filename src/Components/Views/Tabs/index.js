import { Navigation } from 'react-native-navigation';

//icons required for android tabs
import falseIcon from '../../../Assets/circle.png';

//all logic for creating tabs
const LoadTabs = () => {
    Navigation.startTabBasedApp({
        //objects here are tabs
        tabs: [
            {
                //same name as before project.name
                screen:"sellItApp.Home",
                label:"Home",
                title:"Home Title",
                //android needs it 
                icon:falseIcon
            },
            {
                //same name as before project.name
                screen:"sellItApp.AddPost",
                label:"Add Post Sell It",
                title:"Add Post Sell It Title",
                //android needs it 
                icon:falseIcon
            }
        ]
    })
}

export default LoadTabs;