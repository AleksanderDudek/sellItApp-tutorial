import { Dimensions } from 'react-native';

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape";
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change", cb);
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change");
}