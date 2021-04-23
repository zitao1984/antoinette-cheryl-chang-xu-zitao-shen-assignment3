/**
 *
 * @param props post
 * @returns {JSX.Element}
 * @constructor
 */


const PostText=props=>{

    const time = new Date(props.post.timestamp)
    // console.log(props.thread)

    return (

        <div className="card text-dark bg-light mb-3" style={{marginBottom:'1em' }}>
            <div className="card-header">Posted by: {time.toString()}</div>
            <div className="card-body">
                <h2 className="card-title">{props.post.title}</h2>
                <h3 className="card-subtitle">From: {props.post.username} </h3>
                <p className="card-text mt-3 thread-p ">{props.post.text}</p>
            </div>
        </div>
    )

}

export default PostText;