import { useDispatch, useSelector } from "react-redux";
import CommentCreator from "./CommentCreator";
import PostBoard from "./PostBoard";
import { NOTE_TYPE } from "../redux/stateConstants";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import CommentBoard from "./CommentBoard";
/**
 *
 * @param props post
 * @returns {JSX.Element}
 * @constructor
 */

const PostText = (props) => {
  const postID = props.match.params.postID;
  console.log(postID);

  const allPosts = useSelector((state) => state.posts.posts);
  console.log(allPosts);
  if (!allPosts || Object.keys(allPosts).length === 0) {
    return null;
  }
  // Convert the allPosts object into a map to get post object by postID
  const allPostsMap = new Map(Object.entries(allPosts));
  console.log(allPostsMap);

  const currentPost = allPostsMap.get(postID);
  console.log(currentPost);

  let postExists = currentPost;

  return (
    <div>
      {!postExists ? (
        <div>
          <PostBoard></PostBoard>
        </div>
      ) : (
        <div className="main-container padding-30">
          {/* Post Section */}
          <h1 className="text-center">Post</h1>
          <div className={"p-2"}>
            <div
              className="card text-dark bg-light mb-3"
              style={{ marginBottom: "1em" }}
            >
              <div className="card-header">
                <div className="post-row">
                  {currentPost.type === NOTE_TYPE.TEXT ? (
                    <div>
                      Text <FontAwesomeIcon icon={faCommentDots} />
                    </div>
                  ) : (
                    <div>
                      Link <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                  )}
                  <div>
                    Posted on:{" "}
                    {new Date(currentPost.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="card-body">
                <h2 className="card-title">{currentPost.title}</h2>
                <h5 className="card-subtitle">By: {currentPost.username} </h5>
                {currentPost.type === NOTE_TYPE.LINK ? (
                  <a href={"https://" + currentPost.url}>
                    <p className="card-text mt-3 thread-p ">
                      {currentPost.url}
                    </p>
                  </a>
                ) : (
                  <p className="card-text mt-3 thread-p ">{currentPost.text}</p>
                )}
              </div>
            </div>
          </div>
          {/* Comment Section */}
          <CommentBoard post={currentPost} postID={postID} />
        </div>
      )}
    </div>
  );
};

export default PostText;
