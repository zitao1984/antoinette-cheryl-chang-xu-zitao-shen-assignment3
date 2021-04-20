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

}