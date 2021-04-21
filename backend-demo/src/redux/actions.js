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

  }

}