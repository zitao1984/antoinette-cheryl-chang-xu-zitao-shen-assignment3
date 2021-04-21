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

function MainView(props) {

  // WARNING: Only put the following code in App.js.Putting it here causes infinite re-renders.
  // const dispatch = useDispatch();
  // dispatch(ACTIONS.getPosts());

  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  return (
    <div className="container-fluid d-flex flex-column align-items-center">

      {
        Object.entries(posts).map(([postID, post], index) => {
          console.log(postID, post);
          return <Card key={postID} postID={postID} post={post}/>
        })
      }

      <div className="post-generator my-3 post-card">
        <button className="btn btn-primary" type="button" onClick={() => dispatch(ACTIONS.addPost(generate()))}>
          Generate a sample post
        </button>
      </div>
      
    </div>
  )
}

export default MainView;