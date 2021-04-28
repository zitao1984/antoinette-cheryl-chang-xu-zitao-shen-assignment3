import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";
import CommentCreator from "./CommentCreator";

import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param props: post,postID
 * @returns {JSX.Element}
 * @constructor
 */

const CommentBoard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.getComments(props.postID));
  }, [dispatch]);

  const currentComments = useSelector((state) => state.comments.comments);



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
            // time order: from oldest to newest
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
