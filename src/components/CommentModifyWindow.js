import Modal from 'react-bootstrap/Modal'
import CommentCreator from "./CommentCreator";

/**
 *
 * @param props:postID,commentID,OnHide,message
 * @returns {JSX.Element}
 * @constructor
 */
const CommentModifyWindow= props=>{
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
                <CommentCreator postID={props.postID} commentID={props.commentID} message={props.message}/>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    );

}
export default CommentModifyWindow;