import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducers from './Reducers';

let reduxCompose = compose;

//if we are in development mode
if(__DEV__){
    //do we have devtools then that
    reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
    return createStore(Reducers, reduxCompose(applyMiddleware(promiseMiddleware)));
}

export default configStore;