import {ACTION_TYPES} from "../actionConstants";
import {LOGIN_STATE} from "../stateConstants";

const INITIAL_STATE = {
    loginState: LOGIN_STATE.LOGGED_OUT
}

export const loginReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return { loginState: LOGIN_STATE.LOGGED_IN }
        case ACTION_TYPES.INVALID_LOGIN:
            return {loginState: LOGIN_STATE.INVALID_LOGIN }
        case ACTION_TYPES.LOGIN_NETWORK_ERROR:
            return {loginState: LOGIN_STATE.NETWORK_ERROR }
        case ACTION_TYPES.LOGOUT:
            return {loginState: LOGIN_STATE.LOGGED_OUT }
        default:
            return state;
    }
}