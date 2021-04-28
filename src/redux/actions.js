import Axios from 'axios';
import { ACTION_TYPES } from './actionConstants';


export const ACTIONS = {

  updateLocalPosts: (posts) => ({type: ACTION_TYPES.GET_POSTS, payload: {posts:posts}}),

  deleteLocalPost: (posts) => ({type: ACTION_TYPES.DELETE_POST, payload: {posts:posts}}),

  modifyLocalPost: (posts) => ({type: ACTION_TYPES.MODIFY_POST, payload: {posts:posts}}),

  updateLocalComments:(comments)=>({type:ACTION_TYPES.GET_COMMENTS,payload:{comments:comments}}),


    deleteLocalComments:(comments)=> ({type: ACTION_TYPES.DELETE_COMMENTS, payload: {comments:comments}}),

    addCommentsToLocal:(comments)=>({type:ACTION_TYPES.POST_COMMENTS,payload:{comments:comments}}),

    modifyLocalComments:(comments)=>({type:ACTION_TYPES.MODIFY_COMMENTS,payload:{comments:comments}}),

    login: (username) => ({type: ACTION_TYPES.LOGIN_SUCCESS, payload: {user:username}}),

    updateErrMsg: (message) => ({type: ACTION_TYPES.UPDATE_ERR_MSG, payload: {errMsg: message}}),

    signUp: (username) => {
      // console.log("i am working")
      return({type: ACTION_TYPES.LOGIN_SUCCESS, payload: {user:username}})},

    leave: () => ({type: ACTION_TYPES.LOGOUT}),

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
                    dispatch(ACTIONS.updateErrMsg(error.response.data.message));
                })
        }
    },

    // login with username and password
    regularLogin: (username, password) => {
        return dispatch => {
            Axios.post("/api/users/login", {username: username, password: password})
                .then(res => {
                    if (res.data.loggedIn) {
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

    logOut: (username)=>{
        return dispatch => {
            Axios.post("/api/users/logout", {username: username})
                .then(res => {
                    if (res.data.loggedOut) {
                        dispatch(ACTIONS.leave());
                    }
                })
                .catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    dispatch(ACTIONS.updateErrMsg(error.response.data.message));
                })
        }
    },


    register: (username,password)=>{
      return dispatch=>{
        Axios.post("/api/users/register", {username: username, password: password})
            .then(res => {
                console.log(res)
                if (res.data.signedUp) {
                    console.log(res.data.username);
                    // dispatch(ACTIONS.signUp(res.data.username));
                    dispatch(ACTIONS.regularLogin(username,password))
                }
            })
            .catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
                dispatch(ACTIONS.updateErrMsg(error.response.data.message));
            })
    }
    },

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
        dispatch(ACTIONS.updateLocalPosts(res.data))
      })
      .catch(error => console.log(error));

    }

  },

  // addPost: (post) => {
  //   return dispatch => {
  //     Axios.post("/api/posts", post)
  //     .then((res) => {
  //       console.log(`Post and new post id is ${res.data}`);
  //       Axios.get("api/posts")
  //       .then(res => {
  //         console.log("GET after POST")
  //         console.log(res.data);
  //         dispatch(ACTIONS.addPostToLocal(res.data));
  //       })
  //       .catch(error => console.log(error))
  //     })
  //     .catch(error => console.log(error));
  //   }
  // },

    addPost: (postID,post) => {
      return dispatch => {
        Axios.post("/api/posts?postID="+postID, post)
        .then((res) => {
          console.log(`Post and new post id is ${res.data}`);
          // Axios.get("api/posts")
          // .then(res => {
          //   console.log("GET after POST")
          //   console.log(res.data);
          //   dispatch(ACTIONS.addPostToLocal(res.data));
          // })
          // .catch(error => console.log(error))
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
              dispatch(ACTIONS.deleteLocalPost(res.data));
        })
            .catch(error => console.log(error))
      })
          .catch(error => console.log(error));
    }
  },



  modifyPost:(postID,post)=>{
    return dispatch=>{
      Axios.put("/api/posts?postID="+postID,post).
          then(res=>{
        console.log(`modified post is ${res.data}`);
        Axios.get("/api/posts")
            .then(res => {
              console.log("GET after Put")
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
                // Axios.get("api/comments",{params: {postID: postID}})
                //     .then(res => {
                //         console.log("GET after comment")
                //         dispatch(ACTIONS.deleteLocalComments(res.data));
                //     })
                //     .catch(error => console.log(error))
            })
                .catch(error => console.log(error));
        }
    },

    modifyComment:(postID,commentID,comment)=>{
        return dispatch=>{
            Axios.put("/api/comments?postID="+postID+"&commentID="+commentID,comment).
            then(res=>{
                console.log(`modified comment is ${res.data}`);
                // Axios.get("/api/comments?postID="+postID)
                //     .then(res => {
                //         console.log("GET after Put")
                //         dispatch(ACTIONS.modifyLocalComments(res.data));
                //     })
                //     .catch(error => console.log(error))
            })
                .catch(error => console.log(error));
        }

    },






}