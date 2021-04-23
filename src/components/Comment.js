import {useState} from "react";
// import CommentCreator from "./CommentCreator";
import {ACTIONS} from "../redux/actions";
import CommentModifyWindow from "./CommentModifyWindow";
import {useDispatch} from "react-redux";

/**
 *
 * @param commentID,comment,postID
 * @returns {JSX.Element}
 * @constructor
 */

const Comment= props=>{
    const [modifyStatus, setModifyStatus]=useState(false)
    const dispatch = useDispatch();
    // const user =useSelector(state=>state.user);
    const user={
        name:"zitao",
    }
    //
     const time = new Date(props.comment.timestamp)

    const canSubmit = user.name===props.comment.username
    console.log(props.postID)

    return (
        <div className="card text-dark bg-light mb-3" key={props.commentID} style={{marginBottom:'1em' }}>
            <div className="card-header">Posted on: {time.toString()}</div>
            <div className="card-body">
                <h3 className="card-subtitle">From: {props.comment.username}</h3>
                <p className="card-text mt-3 message">{props.comment.text}</p>
            </div>
            <div>
                <button className="btn btn-danger" type="submit" disabled={!canSubmit} onClick={()=>dispatch(ACTIONS.deleteComment(props.postID,props.commentID))}>Delete </button>
                <button className="btn btn-primary" type="submit" disabled={!canSubmit} onClick={()=>setModifyStatus(true)}>Modify </button>

                <CommentModifyWindow show={modifyStatus} onHide={setModifyStatus} postID={props.postID} commentID={props.commentID}
                message={props.comment.text}/>
            </div>
        </div>


    )

}

export default Comment;