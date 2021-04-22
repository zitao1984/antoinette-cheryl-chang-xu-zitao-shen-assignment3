import React from 'react'

// props.postID
//props.post

function Card(props) {

  const postID = props.postID;
  const post = props.post;

  return (
    <div className="card my-3 post-card">
      <div className="card-header d-flex justify-content-between">
        <div>{post.title}</div>
        <div>{`postID: ${postID}`}</div>
      </div>
      <div className="card-body">
        <p>{`username: ${post.username}`}</p>
        <p>{`userID: ${post.userID}`}</p>
        <p>{`TYPE: ${post.type}`}</p>
        {post.type === 'TEXT' ? 
          <p>{`text: ${post.text}`}</p> : <p>{`url: ${post.url}`}</p>
        }
      </div>
      <div className="card-footer text-muted">
        {new Date(post.timestamp).toLocaleString()}
      </div>
    </div>
  )
}

export default Card;