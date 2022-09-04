import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './types';

import { USER_SERVER } from '../components/Config.js';

/** 유저 로그인 */
export function loginUser(dataTomSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataTomSubmit)
        .then((res) => {
            return res.data;
        }).catch((Error) => {
            console.error("에러 :", Error);
        });
    return {
        type: LOGIN_USER,
        payload: request
    }
}

/** 유저 등록 */
export function registerUser(dataTomSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataTomSubmit)
        .then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}


/** 유저 권한확인 */
export function auth() {
    const request = axios.post(`${USER_SERVER}/auth`)
        .then(res => res.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}



/** 로그아웃 */
export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}