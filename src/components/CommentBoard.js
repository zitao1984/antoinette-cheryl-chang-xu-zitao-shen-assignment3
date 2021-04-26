import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";
import CommentCreator from "./CommentCreator";

import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { LOGIN_STATE } from "../redux/stateConstants";

/**
 *
 * @param props: post,postID
 * @returns {JSX.Element}
 * @constructor
 */

const CommentBoard = (props) => {
  const dispatch = useDispatch();

  //   const postID = props.match.params.postID;
  //   console.log(postID);

  useEffect(() => {
    dispatch(ACTIONS.getComments(props.postID));
  }, [dispatch]);

  const currentComments = useSelector((state) => state.comments.comments);
  // const orderComments = currentComments.sort((a, b) => (a.post_time > b.post_time) ? 1 : -1)

  //   const allPosts = useSelector((state) => state.posts.posts);
  //   console.log(allPosts);

  // Convert the allPosts object into a map to get post object by postID
  //   const allPostsMap = new Map(Object.entries(allPosts));
  //   console.log(allPostsMap);

  //   const currentPost = allPostsMap.get(postID);
  //   console.log(currentPost);

  const time = new Date(props.post.timestamp);
  console.log(props.postID);

  const state = useSelector((state) => state);
  console.log(state);

  return (
    <div className="main-container padding-30">
      <h1 className="text-center">Comments</h1>
      <div className={"p-2"}>
        <div>
          <h2 className="display-6 font-weight-bold text-dark ">
            Reply <FontAwesomeIcon icon={faReply} />{" "}
          </h2>
          <CommentCreator postID={props.postID} commentID={"0"} message={""} />
        </div>
        <div>
          {
            // time order: from newest to oldest
            Object.entries(currentComments)
              .sort((a, b) => a[1].timestamp - b[1].timestamp)
              .map(([commentID, comment], index) => {
                return (
                  <Comment
                    comment={comment}
                    commentID={commentID}
                    postID={props.postID}
                  />
                );
              })
          }
        </div>
      </div>
    </div>
  );
};
export default CommentBoard;
