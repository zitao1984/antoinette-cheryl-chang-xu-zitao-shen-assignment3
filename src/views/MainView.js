import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import uuid from 'react-uuid';
import { ACTIONS } from '../redux/actions';

const generate = () => {
  return {
    type: "TEXT",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: "",
    title: "Test Post",
    timestamp: new Date().getTime(),
    userID: uuid(),
    username: "post-generator",
  };
}

const newPost = () => {
    return {
        type: "TEXT",
        text: "kkkkkk",
        url: "",
        title: "Test Post",
        timestamp: new Date().getTime(),
        userID: uuid(),
        username: "post-generator",
    };
}
const newComments =()=>{
    return{
        userID: uuid(),
        username: "Sam",
        text: "no problem",
        timestamp: new Date().getTime()

    }
}

const a =newPost()
const b = newComments()


function MainView(props) {

  // WARNING: Only put the following code in App.js.Putting it here causes infinite re-renders.
  // const dispatch = useDispatch();
  // dispatch(ACTIONS.getPosts());

  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
 // console.log(Object.entries(posts)[0][0])

  return (
    <div className="container-fluid d-flex flex-column align-items-center">

      { // time order: from oldest to newest
        Object.entries(posts).sort((a, b) => (a[1].timestamp - b[1].timestamp)).map(([postID, post], index) => {
          console.log(postID, post);
          return <Card key={postID} postID={postID} post={post}/>
        })
      }

      <div className="post-generator my-3 post-card">
        <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.addPost(generate()))}>
          Generate a sample post
        </button>
      </div>
      <div className="post-generator my-3 post-card">
        <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.deletePost("3LGR5hYGLm0EjhHwhmWz",))}>
          delete a sample post
        </button>
      </div>
      <div className="post-generator my-3 post-card">
        <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.modifyPost("loGt2WIpdHdXappX7mRh",a))}>
          modify a sample post
        </button>
      </div>
        <div className="post-generator my-3 post-card">
            <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.getComments("CPoPrlvrO7nkNt3dQh8Y"))}>
                see comment
            </button>
        </div>

        <div className="post-generator my-3 post-card">
            <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.deleteComment("CPoPrlvrO7nkNt3dQh8Y","AZ04WHQRL6ebipbTDhMb"))}>
                delet comment
            </button>
        </div>

        <div className="post-generator my-3 post-card">
            <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.addComments("CPoPrlvrO7nkNt3dQh8Y",b))}>
                add comment
            </button>
        </div>

        <div className="post-generator my-3 post-card">
            <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.modifyComment("CPoPrlvrO7nkNt3dQh8Y","2a7U3dnlv21fBqqgKxJE",b))}>
                modify comment
            </button>
        </div>
      
    </div>
  )
}

export default MainView;