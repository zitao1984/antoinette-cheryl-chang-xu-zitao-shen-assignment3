import { ACTION_TYPES} from "../actionConstants";

const INITIAL_STATE = {
    posts:{},


};

export const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_POSTS:
            return {
                posts:action.payload.posts,
            }

        case  ACTION_TYPES.DELETE_POST:
            return{
                posts:action.payload.posts,
            }

        case ACTION_TYPES.MODIFY_POST:
            return {
                posts:action.payload.posts,
            }

        case ACTION_TYPES.POST_POST:
            return {
                posts:action.payload.posts,
            }
        case ACTION_TYPES.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}