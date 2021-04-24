import { createStore,combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {commentsReducer} from "./reducers/comments";
import {userReducer} from "./reducers/user";
import {postReducer} from "./reducers/posts";
import {loginReducer} from "./reducers/login";



export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  posts: postReducer,
  comments:commentsReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));