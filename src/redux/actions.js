import Axios from 'axios';
import { ACTION_TYPES } from './actionConstants';


export const ACTIONS = {

  updateLocalPosts: (posts) => ({type: ACTION_TYPES.GET_POSTS, payload: {posts:posts}}),

  addPostToLocal: (posts) => ({type: ACTION_TYPES.POST_POST, payload: {posts:posts}}),

  deleteLocalPost: (posts) => ({type: ACTION_TYPES.DELETE_POST, payload: {posts:posts}}),

  modifyLocalPost: (posts) => ({type: ACTION_TYPES.MODIFY_POST, payload: {posts:posts}}),

  updateLocalComments:(comments)=>({type:ACTION_TYPES.GET_COMMENTS,payload:{comments:comments}}),


    deleteLocalComments:(comments)=> ({type: ACTION_TYPES.DELETE_COMMENTS, payload: {comments:comments}}),

    addCommentsToLocal:(comments)=>({type:ACTION_TYPES.POST_COMMENTS,payload:{comments:comments}}),

    modifyLocalComments:(comments)=>({type:ACTION_TYPES.MODIFY_COMMENTS,payload:{comments:comments}}),

  clearComments: ()=>{
    return{
      type:ACTION_TYPES.CLEAR_COMMENTS,
      payload:{
        comments:[]
      }
    }
  },

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
          dispatch(ACTIONS.addPostToLocal(res.data));
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error));
    }
  },

  deletePost:(postID)=>{
    return dispatch =>{
      Axios.delete("/api/posts",{params: {postID: postID}}).
      then(res =>{
        console.log('delete by post id.');
        Axios.get("api/posts")
            .then(res => {
              console.log("GET after POST")
              console.log(res.data);
              dispatch(ACTIONS.deleteLocalPost(res.data));
        })
            .catch(error => console.log(error))
      })
          .catch(error => console.log(error));
    }
  },


  // TODO:issue with rerendering
  modifyPost:(postID,post)=>{

    return dispatch=>{
      Axios.put("/api/posts?postID="+postID,post).
          then(res=>{
        console.log(`modified post is ${res.data}`);
        Axios.get("/api/posts")
            .then(res => {
              console.log("GET after Put")
              console.log(res.data);
              dispatch(ACTIONS.modifyLocalPost(res.data));
            })
            .catch(error => console.log(error))
      })
          .catch(error => console.log(error));
    }
  },

  getComments: (postID) => {
    return dispatch => {
      Axios.get("/api/comments",{params: {postID: postID}})
          .then(res => {
            console.log("Getting all comments done.")
            console.log(res.data);
            dispatch(ACTIONS.updateLocalComments(res.data))
          })
          .catch(error => console.log(error));

    }
  },


  addComments: (postID,comment) => {
    return dispatch => {
      Axios.post("/api/comments?postID="+postID,comment)
          .then((res) => {
            console.log(`Post and new post id is ${res.data}`);
            Axios.get("/api/comments?postID="+postID)
                .then(res => {
                  console.log("GET after POST")
                  console.log(res.data);
                  dispatch(ACTIONS.addCommentsToLocal(res.data));
                })
                .catch(error => console.log(error))
          })
          .catch(error => console.log(error));
    }
  },

    deleteComment:(postID,commentID)=>{
        return dispatch =>{
            Axios.delete("/api/comments",{params: {postID: postID,commentID:commentID}}).
            then(res =>{
                console.log('delete by post id and comment id.');
                Axios.get("api/comments",{params: {postID: postID}})
                    .then(res => {
                        console.log("GET after comment")
                        console.log(res.data);
                        dispatch(ACTIONS.deleteLocalComments(res.data));
                    })
                    .catch(error => console.log(error))
            })
                .catch(error => console.log(error));
        }
    },

    modifyComment:(postID,commentID,comment)=>{
        return dispatch=>{
            Axios.put("/api/comments?postID="+postID+"&commentID="+commentID,comment).
            then(res=>{
                console.log(`modified comment is ${res.data}`);
                Axios.get("/api/comments?postID="+postID)
                    .then(res => {
                        console.log("GET after Put")
                        console.log(res.data);
                        dispatch(ACTIONS.modifyLocalComments(res.data));
                    })
                    .catch(error => console.log(error))
            })
                .catch(error => console.log(error));
        }

    },






}