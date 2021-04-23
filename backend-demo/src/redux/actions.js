/**
 * @author Chang Xu
 * @email xu.chang1@northeastern.edu
 * @create date 2021-04-22 23:38:38
 * @modify date 2021-04-23 00:06:32
 */
import Axios from 'axios';
import { ACTION_TYPES } from './actionConstants';

// const simple_action = {
//   type: "",
//   payload: {

//   }
// }

export const ACTIONS = {

  updateLocalPosts: (posts) => ({type: ACTION_TYPES.GET_POSTS, payload: {posts}}),

  getPosts: () => {

    return dispatch => {

      Axios.get("/api/posts")
      .then(res => {
        console.log("Getting all posts done.")
        console.log(res.data);
        dispatch(ACTIONS.updateLocalPosts(res.data))
      })
      .catch(error => console.log(error));

    }

  },

  addPost: (post) => {

    return dispatch => {
      Axios.post("/api/posts", post)
      .then((res) => {
        console.log(`Post and new post id is ${res.data}`);
        Axios.get("api/posts")
        .then(res => {
          console.log("GET after POST")
          console.log(res.data);
          dispatch(ACTIONS.updateLocalPosts(res.data));
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error));
    }

  },

  login: (username) => ({type: ACTION_TYPES.LOGIN, payload: {username}}),

  updateErrMsg: (message) => ({type: ACTION_TYPES.UPDATE_ERR_MSG, payload: {errMsg: message}}),

  // only dispatched when first loading the app, e.g. refresh the page.
  initLogin: () => {
    return dispatch => {
      Axios.post("/api/users/login", {})
      .then(res => {
        if(res.data.loggedIn){
          console.log(res.data.message);
          dispatch(ACTIONS.login(res.data.username));
        }
      })
      .catch(error => {
        console.log(error.response.status);
        console.log(error.response.data);
        dispatch(ACTIONS.updateErrMsg(error.response.data.message));
      })
    }
  },

  // login with username and password
  regularLogin: (username, password) => {
    return dispatch => {
      Axios.post("/api/users/login", {username: username, password: password})
      .then(res => {
        if(res.data.loggedIn){
          console.log(res.data.message);
          dispatch(ACTIONS.login(res.data.username));
        }
      })
      .catch(error => {
        console.log(error.response.status);
        console.log(error.response.data);
        dispatch(ACTIONS.updateErrMsg(error.response.data.message));
      })
    }
  }

}