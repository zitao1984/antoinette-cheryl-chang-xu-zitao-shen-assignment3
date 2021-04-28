import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

/**
 *
 * @param props:
 * @returns {JSX.Element}
 * @constructor
 */

const PostBoard = () => {
  const currentPosts = useSelector((state) => state.posts.posts);


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
