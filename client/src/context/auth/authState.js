import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOGOUT
} from '../../types/index';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        message: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);

            dispatch({
                type: REGISTER_SUCCESSFUL,
                payload: response.data
            });

            userAuth();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };

            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            });
        }
    };

    const userAuth = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            
            dispatch({
                type: GET_USER,
                payload: response.data
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    const loginUser = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data
            });

            userAuth();
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const logoutUser = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                registerUser,
                loginUser,
                userAuth,
                logoutUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthState;