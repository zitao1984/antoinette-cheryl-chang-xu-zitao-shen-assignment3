import { createStore,combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { ACTION_TYPES } from "./actionConstants";
import {commentsReducer} from "./reducers/comments";
import {userReducer} from "./reducers/user";
import {postReducer} from "./reducers/posts";
import {loginReducer} from "./reducers/login";

// const INITIAL_STATE = {
//   posts: {},
// }
//
// function rootReducer(state = INITIAL_STATE, action) {
//   const newState = { ...state };
//   switch (action.type) {
//     case ACTION_TYPES.GET_POSTS:
//       newState.posts = {...action.payload.posts};
//       break;
//     default:
//       return state;
//   }
//
//   return newState;
// }

export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  posts: postReducer,
  comments:commentsReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));