import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import {LOGIN_STATE} from "../redux/stateConstants";

/**
 *
 * @param props: postID,commentID(0 for new,o.w. for the modify),message
 * @returns {JSX.Element}
 * @constructor
 */
const CommentCreator = props =>{
    //const loginState = useSelector(state => state.login.loginState);
    // const thread= useSelector(state => state.threads.thread);
    // const user =useSelector(state=>state.user);
    const loginState = LOGIN_STATE.LOGGED_IN
    const user={
        name:"zitao",
        id:"Sam005"
    }

    const dispatch =useDispatch()


    const [message, setMessage] = useState({
        message:props.message,
        isValid:undefined});


    const onMessageInputChange = event => {
        setMessage({
            message: event.target.value,
            isValid:event.target.value.length > 0
        })
    }

    let canSubmit = message.isValid && (loginState==="logged in")

    const onSubmit = () => {
        let newComment = {
            userID: user.id,
            username: user.name,
            text: message.message,
            timestamp: new Date().getTime()
        }
        dispatch(ACTIONS.addComments(props.postID,newComment));
        clearForm();
    }

    const clearForm = () => {
        setMessage({
            message:"",
            isValid: undefined});
    }

    return (
        <div className={"p-3"}>
            <div className="row my-2">
                <label className="col-sm-3 col-form-label text-center fst-italic h5" htmlFor="message">Message:</label>
                <div className="col-sm-9">
            <textarea id="message" className="form-control"
                      value={message.message}
                      onChange={e => onMessageInputChange(e)}/>
                    <div className="invalid-feedback" style={message.isValid === false ? {display:"block"} : {display: "none"}}>Message cannot be empty</div>
                </div>
            </div>

            <div className="row my-2">
                <div className="col text-end">
                    <button className="btn btn-primary btn-lg" type="submit" disabled={!canSubmit} onClick={()=>onSubmit()}>submit </button>
                </div>
            </div>

        </div>



    )


}

export default  CommentCreator;