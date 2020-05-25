import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOGOUT
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
        case REGISTER_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: true,
                message: null
            }
        case GET_USER:
            return {
                ...state,
                auth: true,
                user: action.payload.user
            }
        case LOGOUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                auth: null,
                message: action.payload
            }
        default:
            return state;
    }
}