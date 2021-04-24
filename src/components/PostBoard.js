import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../redux/actions";
import Post from "./Post";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply,faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";
import {LOGIN_STATE} from "../redux/stateConstants";


/**
 *
 * @param props:
 * @returns {JSX.Element}
 * @constructor
 */


const PostBoard = ()=>{


    // const dispatch =useDispatch();
    // useEffect(() => {
    //     dispatch(ACTIONS.getPosts())
    // }, [dispatch]);

    const currentPosts= useSelector(state=>state.posts.posts)
    console.log(currentPosts)

    return (
        <div className={"p-2"}>
            <h2>Post List</h2>
            <div>
                { // time order: from oldest to newest
                    Object.entries(currentPosts).sort((a, b) => (a[1].timestamp - b[1].timestamp)).map(([postID, post], index) =>
                    {return  <Post  postID={postID} post={post}/>})
                }
            </div>
        </div>

    )

}
export default PostBoard;