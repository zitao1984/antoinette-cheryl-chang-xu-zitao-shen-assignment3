import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";


/**
 *
 * @param props: postID,commentID(0 for new,o.w. for the modify),message,onHide
 * @returns {JSX.Element}
 * @constructor
 */
const CommentCreator = (props) => {
  const loginState = useSelector((state) => state.login.loginState);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const decideMessage = (ID) => {
    if (ID === "0") {
      return {
        message: props.message,
        isValid: undefined,
      };
    } else {
      return {
        message: props.message,
        isValid: true,
      };
    }
  };

  const [message, setMessage] = useState(() => {
    const initialState = decideMessage(props.postID);
    return initialState;
  });

  const onMessageInputChange = (event) => {
    setMessage({
      message: event.target.value,
      isValid: event.target.value.length > 0,
    });
  };

  const canSubmit = message.isValid && loginState === "logged in";

  const onSubmit = () => {
    let newComment = {
      // userID: user.id,
      username: user,
      text: message.message,
      timestamp: new Date().getTime(),
    };
    if (props.commentID === "0") {
      dispatch(ACTIONS.addComments(props.postID, newComment));
    } else {
      dispatch(ACTIONS.modifyComment(props.postID, props.commentID, newComment));
          dispatch(ACTIONS.getComments(props.postID));
      props.onHide(false);
    }
    clearForm();
  };

  const clearForm = () => {
    setMessage({
      message: "",
      isValid: undefined,
    });
  };

  return (
    <div className={"p-3"}>
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
            value={message.message}
            onChange={(e) => onMessageInputChange(e)}
          />
          <div
            className="invalid-feedback"
            style={
              message.isValid === false
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Message cannot be empty
          </div>
        </div>
      </div>

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

export default CommentCreator;
