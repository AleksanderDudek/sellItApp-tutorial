import {
    REGISTER_USER
} from '../types';

import axios from 'axios';

import { SIGNUP } from '../../Utils/misc';

export function signUp(data){

    const request = axios({
        method:"POST",
        url: SIGNUP,
        data:{
            email:data.email,
            password:data.password,
            returnSecureToken:true
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then( response => {
        console.log(response.data)
        return response.data
    }).catch(err => {
        return false;
    });

    return {
        type:REGISTER_USER,
        payload:request
    }

}