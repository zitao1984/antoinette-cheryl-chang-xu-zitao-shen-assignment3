import React from 'react'
import { useSelector } from 'react-redux';
import Card from '../components/Card';

function MainView(props) {

  // WARNING: Only put the following code in App.js.Putting it here causes infinite re-renders.
  // const dispatch = useDispatch();
  // dispatch(ACTIONS.getPosts());

  const posts = useSelector(state => state.posts);

  return (
    <div className="container-fluid d-flex flex-column align-items-center">

      {
        Object.entries(posts).map(([postID, post], index) => {
          console.log(postID, post);
          return <Card key={postID} postID={postID} post={post}/>
        })
      }
      
    </div>
  )
}

export default MainView;