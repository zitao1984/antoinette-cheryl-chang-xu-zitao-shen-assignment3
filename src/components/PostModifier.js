import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOTE_TYPE } from "../redux/stateConstants";
import { ACTIONS } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param props postID(0 for new post) title,message,url,type(default be text),onHide
 * @returns {JSX.Element}
 * @constructor
 */

const PostModifier = (props) => {
  const loginState = useSelector((state) => state.login.loginState);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const decideTitle = (ID) => {
    if (ID === "0") {
      return {
        title: props.post.title,
        isValid: undefined,
      };
    } else {
      return {
        title: props.post.title,
        isValid: true,
      };
    }
  };

  const decideText = (ID) => {
    if (ID === "0") {
      return {
        text: props.post.text,
        isValid: undefined,
      };
    } else {
      return {
        text: props.post.text,
        isValid: true,
      };
    }
  };

  const decideUrl = (ID) => {
    if (ID === "0") {
      return {
        url: props.post.url,
        isValid: undefined,
      };
    } else {
      return {
        url: props.post.url,
        isValid: true,
      };
    }
  };

  const [title, setTitle] = useState(() => {
    const initialState = decideTitle(props.postID);
    return initialState;
  });

  const [text, setText] = useState(() => {
    const initialState = decideText(props.postID);
    return initialState;
  });

  const [url, setUrl] = useState(() => {
    const initialState = decideUrl(props.postID);
    return initialState;
  });

  const [type, setType] = useState(props.post.type);

  const onTitleInputChange = (event) => {
    setTitle({
      title: event.target.value,
      isValid: event.target.value.length > 0,
    });
  };

  const onMessageInputChange = (event) => {
    setText({
      text: event.target.value,
      isValid: event.target.value.length > 0,
    });
  };

  const onUrlInputChange = (event) => {
    setUrl({
      url: event.target.value,
      isValid: event.target.value.length > 1,
    });
  };

  const linkNoteChecking = () => {
    return (
      type === NOTE_TYPE.LINK && url.isValid === true && title.isValid === true
    );
  };

  const textNoteChecking = () => {
    return (
      type === NOTE_TYPE.TEXT && text.isValid === true && title.isValid === true
    );
  };

  let canSubmit =
    (linkNoteChecking() || textNoteChecking()) && loginState === "logged in";

  const onSubmit = () => {
    let newPost = {
      type: type,
      text: text.text,
      url: url.url,
      title: title.title,
      timestamp: new Date().getTime(),
      // userID: user.id,
      username: user,
    };
    if (props.postID === "0") {
      console.log(newPost);
      dispatch(ACTIONS.addPost(newPost));
    } else {
      dispatch(ACTIONS.modifyPost(props.postID, newPost));
      props.onHide(false);
    }
    clearForm();
  };

  const clearForm = () => {
    setTitle({
      title: "",
      isValid: undefined,
    });
    setText({
      text: "",
      isValid: undefined,
    });
    setType(NOTE_TYPE.TEXT);
    setUrl({
      url: "",
      isValid: undefined,
    });
  };

  return (
    <div>
      {props.postID === "0" ? (
        <h2 className={"display-5 font-weight-bold text-dark"}>
          Make a new post
          <FontAwesomeIcon icon={faEnvelope} />
        </h2>
      ) : (
        ""
      )}
      <div className="row my-2 ">
        <legend className="col-form-label col-sm-3 pt-0">Post type:</legend>
        <div className="col-auto">
          <input
            type="radio"
            className="form-check-input"
            id="text"
            name="noteType"
            checked={type === NOTE_TYPE.TEXT}
            onChange={(e) => setType(e.target.id)}
          />{" "}
          <label className="form-check-label" htmlFor="text">
            Text{" "}
          </label>
          <div
            className="invalid-feedback feedbackCustomize"
            style={
              type === NOTE_TYPE.TEXT
                ? { display: "block" }
                : { display: "none" }
            }
          />
        </div>
        <div className="col-auto">
          <input
            type="radio"
            className="form-check-input"
            id="link"
            name="noteType"
            checked={type === NOTE_TYPE.LINK}
            onChange={(e) => setType(e.target.id)}
          />{" "}
          <label className="form-check-label" htmlFor="link">
            Link
          </label>
          <div
            className="invalid-feedback feedbackCustomize"
            style={
              type === NOTE_TYPE.LINK
                ? { display: "block" }
                : { display: "none" }
            }
          />
        </div>
      </div>
      <div className="row my-2">
        <label
          className="col-sm-3 col-form-label  text-center h5"
          htmlFor="title"
        >
          Title:
        </label>
        <div className="col-sm-9">
          <input
            id="title"
            className="form-control"
            type="text"
            value={title.title}
            onChange={(e) => onTitleInputChange(e)}
          />
          <div
            className="invalid-feedback"
            style={
              title.isValid === false
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Title cannot be empty
          </div>
        </div>
      </div>

      {type === NOTE_TYPE.TEXT ? (
        <div className="row my-2">
          <label
            className="col-sm-3 col-form-label text-center h5"
            htmlFor="message"
          >
            Message:
          </label>
          <div className="col-sm-9">
            <textarea
              id="message"
              className="form-control"
              value={text.text}
              onChange={(e) => onMessageInputChange(e)}
            />
            <div
              className="invalid-feedback"
              style={
                text.isValid === false
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              Message cannot be empty
            </div>
          </div>
        </div>
      ) : (
        <div className="row my-2 text-center">
          <label className="col-sm-3 col-form-label h5" htmlFor="url">
            URL:
          </label>
          <div className="col-sm-9">
            <input
              id="url"
              className="form-control"
              type="text"
              value={url.url}
              onChange={(e) => onUrlInputChange(e)}
            />
            <div
              className="invalid-feedback"
              style={
                url.isValid === false
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              For a link post: you must have URL and Title
            </div>
          </div>
        </div>
      )}

      <div className="row my-2">
        <div className="col text-center padding-10">
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={!canSubmit}
            onClick={() => onSubmit()}
          >
            submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModifier;
