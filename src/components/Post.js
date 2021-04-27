import { useEffect, useState } from "react";

import { ACTIONS } from "../redux/actions";
import PostModifyWindow from "./PostModifyWindow";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { NOTE_TYPE } from "../redux/stateConstants";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CommentBoard from "./CommentBoard";
import PostBoard from "./PostBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faNewspaper } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param post,postID
 * @returns {JSX.Element}
 * @constructor
 */

const Post = (props) => {
  const [modifyStatus, setModifyStatus] = useState(false);
  const [url, checkUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (props.post.url === undefined) {
    } else if (props.post.url.substring(0,8) === "https://") {
      checkUrl(props.post.url.substring("https://".length));
    } else if (props.post.url.substring(0, 7) === "http://") {
      checkUrl(props.post.url.substring("http://".length));
    } else {
      checkUrl(props.post.url);
    }
  }, [props.post]);
  console.log(url)

  const time = new Date(props.post.timestamp);
  console.log(user);
  console.log(props.post.username);

  const canSubmit = user === props.post.username;

  return (
    <div className="main-container padding-10">
      <div
        className="card border-dark bg-light mb-3"
        key={props.postID}
        style={{ marginBottom: "1em" }}
      >
        <div className="card-body">
          <div className="post-row">
            {props.post.type === NOTE_TYPE.TEXT ? (
              <div>
                <div>
                  Text <FontAwesomeIcon icon={faCommentDots} />
                </div>
              </div>
            ) : (
              <div>
                Link <FontAwesomeIcon icon={faNewspaper} />
              </div>
            )}
            <div>Posted on: {time.toLocaleString()}</div>
          </div>

          {props.post.type === NOTE_TYPE.TEXT ? (
            <div>
              <Link to={"/posttext/" + props.postID}>
                <h3 type="button" className="card-text mt-3 message">
                  {props.post.title}
                </h3>
              </Link>
            </div>
          ) : (
            <div>
              <a href={"//"+url}>
                <h3 className="card-text mt-3 message">{props.post.title}</h3>
              </a>
            </div>
          )}

          <div>
            <p className="card-subtitle padding-top">
              By: {props.post.username}
            </p>
          </div>
        </div>

        <div className="card-footer">
          <div className="footer-row">
            {props.post.type === NOTE_TYPE.LINK ? (
              <div className="footer-col">
                <Link to={"/posttext/" + props.postID}>
                  <button type="button" className="btn btn-primary">
                    Comments
                  </button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}

            {canSubmit ? (
              <div className="footer-col">
                <button
                  className="btn btn-danger"
                  type="submit"
                  disabled={!canSubmit}
                  onClick={() => dispatch(ACTIONS.deletePost(props.postID))}
                >
                  Delete{" "}
                </button>
              </div>
            ) : (
              <div></div>
            )}

            {canSubmit ? (
              <div className="footer-col">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!canSubmit}
                  onClick={() => setModifyStatus(true)}
                >
                  Modify{" "}
                </button>
                <PostModifyWindow
                  show={modifyStatus}
                  onHide={setModifyStatus}
                  postID={props.postID}
                  post={props.post}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
