/**
 * @author Chang Xu
 * @email xu.chang1@northeastern.edu
 * @create date 2021-04-22 23:50:26
 * @modify date 2021-04-23 00:31:25
 */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
// import uuid from 'react-uuid';
import { ACTIONS } from '../redux/actions';

const generate = () => {
  return {
    type: "TEXT",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    url: "",
    title: "Test Post",
    timestamp: new Date().getTime(),
    // userID: uuid() // Updated on Apr22, no longer needed
    username: "post-generator",
  };
}

function MainView(props) {

  // WARNING: Only put the following code in App.js.Putting it here causes infinite re-renders.
  // const dispatch = useDispatch();
  // dispatch(ACTIONS.getPosts());

  const posts = useSelector(state => state.posts);
  const errMsg = useSelector(state => state.errMsg);
  const loggedInUsername = useSelector(state => state.loggedInUsername);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-fluid d-flex flex-column align-items-center">

      <div className="login-component my-3">
        {loggedInUsername != null ?
          <p>{`${loggedInUsername} has logged in`}</p>
          :
          <div>
            <div className="mb-3">
              <label for="usernameInput" className="form-label">Username</label>
              <input type="text" className="form-control" id="usernameInput" value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            
            <div className="mb-3">
              <label for="passwordInput" className="form-label">Password</label>
              <input type="password" className="form-control" id="passwordInput" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <button type="button" className="btn btn-primary" onClick={() => {
              dispatch(ACTIONS.regularLogin(username, password));
              setUsername("");
              setPassword("");
            }}>Log in</button>

            <p className="text-danger my-2">{errMsg}</p>
          </div>
        }
      </div>

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

    </div>
  )
}

export default MainView;