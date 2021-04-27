import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";
import Post from "./Post";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { LOGIN_STATE } from "../redux/stateConstants";

/**
 *
 * @param props:
 * @returns {JSX.Element}
 * @constructor
 */

const PostBoard = () => {
  const currentPosts = useSelector((state) => state.posts.posts);
  console.log(currentPosts);

  return (
    <div className="main-container padding-10">
      <div className={"p-2"}>
        <h1 className="text-center">Today's Good News</h1>
        <div>
          {
            // time order: from newest to oldest
            Object.entries(currentPosts)
              .sort((a, b) => b[1].timestamp - a[1].timestamp)
              .map(([postID, post], index) => {
                return <Post postID={postID} post={post} />;
              })
          }
        </div>
      </div>
    </div>
  );
};
export default PostBoard;
