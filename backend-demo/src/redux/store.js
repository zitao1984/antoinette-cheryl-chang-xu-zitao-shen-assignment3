import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { ACTION_TYPES } from "./actionConstants";

const INITIAL_STATE = {
  posts: {},
}

function rootReducer(state = INITIAL_STATE, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_TYPES.GET_POSTS:
      newState.posts = {...action.payload.posts};
      break;
    default:
      return state;
  }

  return newState;
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));