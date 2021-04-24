import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../redux/actions";
import CommentCreator from "./CommentCreator";

import Comment from "./Comment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply,faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";
import {LOGIN_STATE} from "../redux/stateConstants";


/**
 *
 * @param props: post,postID
 * @returns {JSX.Element}
 * @constructor
 */


const CommentBoard = props=>{


    const dispatch =useDispatch();

    useEffect(() => {
        dispatch(ACTIONS.getComments(props.postID))
    }, [dispatch]);

    const currentComments= useSelector(state=>state.comments.comments)
    // const orderComments = currentComments.sort((a, b) => (a.post_time > b.post_time) ? 1 : -1)


    const time = new Date(props.post.timestamp)
    console.log(props.postID)



    return (
        <div className={"p-2"}>
            <h2 className={"display-5 font-weight-bold text-primary"}> Comments for {props.post.title} <FontAwesomeIcon icon={faEnvelopeOpen}/></h2>
            <div className="card text-dark bg-light mb-3" key={props.postID} style={{marginBottom:'1em' }}>
                <div className="card-header">Posted by: {time.toString()}</div>
                <div className="card-body">
                    <h3 className="card-subtitle">From: {props.post.username} </h3>
                </div>
            </div>

            <div>
            <h2 className="display-6 font-weight-bold text-dark " >Replay <FontAwesomeIcon icon={faReply}/> </h2>
                <CommentCreator postID={props.postID} commentID={"0"} message={""} />
            </div>
            <div>

                    { // time order: from oldest to newest
                        Object.entries(currentComments).sort((a, b) => (a[1].timestamp - b[1].timestamp)).map(([commentID, comment], index) =>
                        {return  <Comment comment={comment} commentID={commentID} postID={props.postID}/>})
                    }
            </div>

        </div>

    )

}
export default CommentBoard;