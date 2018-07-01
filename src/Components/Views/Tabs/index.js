import { Navigation } from 'react-native-navigation';

//icons required for android tabs
import falseIcon from '../../../Assets/circle.png';


import Icon from 'react-native-vector-icons/FontAwesome';

//all logic for creating tabs
const LoadTabs = () => {

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
                    icon:sources[2]
                },
                {
                    //same name as before project.name
                    screen:"sellItApp.AddPost",
                    label:"Add Post Sell It",
                    title:"Add Post Sell It Title",
                    //android needs it 
                    icon:sources[1]
                }
            ]
        })
    })


}

export default LoadTabs;