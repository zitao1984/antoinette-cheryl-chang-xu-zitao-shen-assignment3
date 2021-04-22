import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {NOTE_TYPE,LOGIN_STATE} from "../redux/stateConstants";
import {ACTIONS} from "../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";



const PostCreator = ()=>{
    // const loginState = useSelector(state => state.login.loginState);
    const loginState = LOGIN_STATE.LOGGED_IN
    // const user =useSelector(state=>state.user);
    const user={
        name:"zitao",
        id:"123"

    }
    const dispatch =useDispatch()


    const [title, setTitle] = useState({
        title:"",
        isValid: undefined});
    const [message, setMessage] = useState({
        message:"",
        isValid:undefined});
    const [url, setUrl] = useState({
        url: "",
        isValid: undefined
    });

    const [type, setType] = useState(NOTE_TYPE.TEXT);

    const onTitleInputChange = event => {
        setTitle({
            title: event.target.value,
            isValid:event.target.value.length > 0
        })
    }

    const onMessageInputChange = event => {
        setMessage({
            message: event.target.value,
            isValid:event.target.value.length > 0
        })
    }

    const onUrlInputChange = event => {
        setUrl({
            url: event.target.value,
            isValid:event.target.value.length >1
        })
    }

    const linkNoteChecking= () =>{
        return type === NOTE_TYPE.LINK && url.isValid === true && title.isValid === true;
    }

    const textNoteChecking =()=>{
        return type === NOTE_TYPE.TEXT && message.isValid===true && title.isValid === true;}


    let canSubmit = (linkNoteChecking()||textNoteChecking()) && (loginState==="logged in")

    const onSubmit = () => {
        let newPost ={
            type: type,
            text: message.message,
            url: url.url,
            title: title.title,
            timestamp: new Date().getTime(),
            userID: user.id,
            username: user.name,
        };
        dispatch(ACTIONS.addPost(newPost));
        clearForm();

    }

    const clearForm = () => {
        setTitle({
            title:"",
            isValid: undefined});
        setMessage({
            message:"",
            isValid: undefined});
        setType(NOTE_TYPE.TEXT);
        setUrl({
            url:"",
            isValid: undefined});

    }


    return (
        <div>
            <h2 className={"display-5 font-weight-bold text-dark"}>Post a new thread <FontAwesomeIcon icon={faEnvelope}/></h2>
            <div className="row my-2 ">
                <legend className="col-form-label col-sm-3 pt-0">Note type:</legend>
                <div className="col-auto">
                    <input type="radio" className="form-check-input" id="text" name="noteType"
                           checked={type === NOTE_TYPE.TEXT}
                           onChange={e => setType(e.target.id)} />
                    {" "}
                    <label className="form-check-label" htmlFor="text">Text{" "}</label>
                    <div className="invalid-feedback feedbackCustomize" style={type === NOTE_TYPE.TEXT? {display:"block"} : {display: "none"}}/>
                </div>
                <div className="col-auto">
                    <input type="radio" className="form-check-input" id="link" name="noteType"
                           checked={type === NOTE_TYPE.LINK}
                           onChange={e => setType(e.target.id)} />
                    {" "}
                    <label className="form-check-label" htmlFor="link">Link</label>
                    <div className="invalid-feedback feedbackCustomize" style={type === NOTE_TYPE.LINK? {display:"block"} : {display: "none"}}/>
                </div>
            </div>
            <div className="row my-2">
                <label className="col-sm-3 col-form-label  text-center fst-italic h5" htmlFor="title">Title:</label>
                <div className="col-sm-9">
                    <input id="title" className="form-control" type="text"
                           value={title.title}
                           onChange={e => onTitleInputChange(e)}/>
                    <div className="invalid-feedback" style={title.isValid===false ? {display:"block"} : {display: "none"}}>Title cannot be empty</div>
                </div>
            </div>

            {
                type===NOTE_TYPE.TEXT?
                    (
                        <div className="row my-2">
                            <label className="col-sm-3 col-form-label text-center fst-italic h5" htmlFor="message">Message:</label>
                            <div className="col-sm-9">
                        <textarea id="message" className="form-control"
                                  value={message.message}
                                  onChange={e => onMessageInputChange(e)}/>
                                <div className="invalid-feedback" style={message.isValid === false ? {display:"block"} : {display: "none"}}>Message cannot be empty</div>
                            </div>
                        </div>
                    ):
                    (
                        <div className="row my-2">
                            <label className="col-sm-3 col-form-label" htmlFor="url">URL:</label>
                            <div className="col-sm-9">
                                <input id="url" className="form-control" type="text"
                                       value={url.url}
                                       onChange={e => onUrlInputChange(e)}/>
                                <div className="invalid-feedback" style={url.isValid===false? {display:"block"} : {display: "none"}}>For link note: you must have URL and Title</div>
                            </div>
                        </div>
                    )
            }

            <div className="row my-2">
                <div className="col text-end">
                    <button className="btn btn-primary btn-lg" type="submit" disabled={!canSubmit} onClick={()=>onSubmit()}>submit </button>
                </div>
            </div>

        </div>

    )


}

export default  PostCreator;