import { useState } from "react";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const user={
  //     name:"zitao",
  // }
  //
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
                Web Link <FontAwesomeIcon icon={faNewspaper} />
              </div>
            )}
            <div>Posted on: {time.toLocaleString()}</div>
          </div>
          <div>
            <a href={"https://" + props.post.url}>
              <h3 className="card-text mt-3 message">{props.post.title}</h3>
            </a>
          </div>
          <div>
            <p className="card-subtitle padding-top">
              By: {props.post.username}
            </p>
          </div>
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="col">
              <Link to={"/posttext/" + props.postID}>
                <button type="button" className="btn btn-primary">
                  Comments
                </button>
              </Link>
            </div>
            {props.post.type === NOTE_TYPE.TEXT ? (
              <div className="col">
                <Link to={"/posttext/" + props.postID}>
                  <button type="button" className="btn btn-primary">
                    View Text
                  </button>
                </Link>
                {/* <button
                  className="btn btn-primary"
                  onCLick={() =>
                    dispatch(ACTIONS.getComments(props.post.postID))
                  }
                >
                  See Text{" "}
                </button> */}
              </div>
            ) : (
              // <PostText post={props.post}/>
              // (<Router>
              //         <div>
              //             <Link to={"/post/"+props.postID} target="_blank">see text</Link>
              //         <Switch>
              //             <Route path={"/post/"+props.postID}>
              //                 <PostText post={props.post}/>
              //             </Route>
              //             <Route path={"/post/zitaoshen"}>
              //                <div>hello</div>
              //             </Route>
              //         </Switch>
              //
              //         </div>
              //
              //     </Router>
              //
              //
              // )
              <div className="col">
                <a href={"https://" + props.post.url}>
                  <button className="btn btn-primary">View Link</button>
                </a>
              </div>
            )}
            <div className="col">
              <button
                className="btn btn-danger"
                type="submit"
                disabled={!canSubmit}
                onClick={() => dispatch(ACTIONS.deletePost(props.postID))}
              >
                Delete{" "}
              </button>
            </div>

            <div className="col">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
