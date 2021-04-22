import {ACTION_TYPES} from "../actionConstants";

const INITIAL_STATE = {
    comments:[]
};

//TODO:comment modify didn't change comment, instead it appends a new record
//TODO: delete doesn't work
export const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_COMMENTS:
            return {comments:action.payload.comments};
        case ACTION_TYPES.DELETE_COMMENTS:
            return{comments:action.payload.comments};
        case ACTION_TYPES.MODIFY_COMMENTS:
            return{comments:[...action.payload.comments]};
        case ACTION_TYPES.POST_COMMENTS:
            return{comments:action.payload.comments};
        case ACTION_TYPES.CLEAR_COMMENTS:
            return{comments:action.payload.comments};
        case ACTION_TYPES.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}