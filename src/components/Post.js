import {useState} from "react";

import {ACTIONS} from "../redux/actions";
import PostModifyWindow from "./PostModifyWindow";
import{useSelector} from "react-redux";

import {useDispatch} from "react-redux";
import {NOTE_TYPE} from "../redux/stateConstants";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import PostText from "./PostText";

/**
 *
 * @param post,postID
 * @returns {JSX.Element}
 * @constructor
 */

const Post= props=>{
    const [modifyStatus, setModifyStatus]=useState(false)
    const dispatch = useDispatch();
    const user =useSelector(state=>state.user);
    // const user={
    //     name:"zitao",
    // }
    //
    const time = new Date(props.post.timestamp)
    console.log(user)
    console.log(props.post.username)

    const canSubmit = user===props.post.username


    return (
        <div className="card text-dark bg-light mb-3" key={props.postID} style={{marginBottom:'1em' }}>
            <div className="card-header">Posted on: {time.toString()}</div>
            <div className="card-body">
                <h3 className="card-subtitle">From: {props.post.username}</h3>
                <p className="card-text mt-3 message">{props.post.title}</p>
            </div>
            <div>
                <button className="btn btn-danger" type="submit" disabled={!canSubmit} onClick={()=>dispatch(ACTIONS.deletePost(props.postID))}>Delete </button>
                <button className="btn btn-primary" type="submit" disabled={!canSubmit} onClick={()=>setModifyStatus(true)}>Modify </button>
                <PostModifyWindow show={modifyStatus} onHide={setModifyStatus} postID={props.postID} post={props.post}/>
                <button className="btn btn-primary" >See Comment </button>

                {
                    props.post.type===NOTE_TYPE.TEXT?
                        <button className="btn btn-primary" >See Text </button>
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
                        :
                        (
                            <a href={"https://"+props.post.url}>
                                <button className="btn btn-primary" >See Web</button>
                            </a>
                        )

                }
            </div>
        </div>


    )

}

export default Post;