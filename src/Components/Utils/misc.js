import { Dimensions,
         Platform,
         AsyncStorage
         } from 'react-native';

export const APIKEY = 'AIzaSyDEPkXs2qKTIS-j0FffnGhQUlVe5SX1LOA';
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`
export const FIREBASEURL = 'https://sellitup-beca2.firebaseio.com/';

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape";
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change", cb);
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change");
}

export const getPlatform = () => {
    if(Platform.OS === 'ios'){
        return "ios"
    } else {
        return "android"
    }
}

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@sellItApp@token',
        '@sellItApp@refreshToken',
        '@sellItApp@expireToken',
        '@sellItApp@uid'
    ]).then(value=>{
        cb(value);
    });
}

export const setTokens = (values, cb) => {

    const dateNow = new Date();
    //3600 * 1000 miliseconds
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@sellItApp@token', values.token],
        ['@sellItApp@refreshToken', values.refToken],
        ['@sellItApp@expireToken', expiration.toString()],
        ['@sellItApp@uid', values.uid]
    ]).then( response => {
        cb();
    });
}

export const navigatorDrawer = (event, $this) => {
    if(event.type === "NavBarButtonPress" && event.id === "DrawerButton"){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })
    }
}

export const navigatorDeepLink = (event, $this) => {
    if(event.type === "DeepLink"){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });

        if(event.payload.typeLink === 'tab'){
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            })
        } else {
            $this.props.navigator.showModal({
                screen: event.link,
                animationType:'slide-horizontal',
                //for android only
                navigatorStyle:{
                    navBarBackgroundColor: '#00ADA9',
                    screenBackgroundColor: '#ffffff',
                    backButtonHidden: false
                }
            })
        }
    }
}