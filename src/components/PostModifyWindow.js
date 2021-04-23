import Modal from 'react-bootstrap/Modal'
import PostCreator from "./PostCreator";
import {NOTE_TYPE} from "../redux/stateConstants";

/**
 *
 * @param props:postID,post,OnHide,show
 * @returns {JSX.Element}
 * @constructor
 */
const PostModifyWindow= props=>{
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify your post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostCreator postID={props.postID}  post={props.post} onHide={props.onHide}/>
            </Modal.Body>
        </Modal>
    );

}
export default PostModifyWindow;