/**
 * @author Chang Xu
 * @email xu.chang1@northeastern.edu
 * @create date 2021-04-22 23:44:47
 * @modify date 2021-04-23 00:07:20
 */
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { ACTION_TYPES } from "./actionConstants";

const INITIAL_STATE = {
  posts: {},
  loggedInUsername: null,
  errMsg: null,

}

function rootReducer(state = INITIAL_STATE, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_TYPES.GET_POSTS:
      newState.posts = {...action.payload.posts};
      break;
    case ACTION_TYPES.LOGIN:
      newState.loggedInUsername = action.payload.username;
      break;
    case ACTION_TYPES.UPDATE_ERR_MSG:
      newState.errMsg = action.payload.errMsg;
      break;
    default:
      return state;
  }

  return newState;
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));