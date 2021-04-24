import {ACTION_TYPES} from "../actionConstants";

const INITIAL_STATE = {}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return action.payload.user;
        // case ACTION_TYPES.SIGN_UP:
        //     return action.payload.user;
        case ACTION_TYPES.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}