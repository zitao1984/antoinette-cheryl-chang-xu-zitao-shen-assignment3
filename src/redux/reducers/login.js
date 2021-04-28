import {ACTION_TYPES} from "../actionConstants";
import {LOGIN_STATE} from "../stateConstants";

const INITIAL_STATE = {
    loginState: LOGIN_STATE.LOGGED_OUT,
    errMsg:null,
}

export const loginReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return { loginState: LOGIN_STATE.LOGGED_IN }
        case ACTION_TYPES.LOGOUT:
            return {loginState: LOGIN_STATE.LOGGED_OUT }
        case ACTION_TYPES.UPDATE_ERR_MSG:
            return{
                loginState: LOGIN_STATE.INVALID_LOGIN,
                errMsg: action.payload.errMsg
            }
        default:
            return state;
    }
}