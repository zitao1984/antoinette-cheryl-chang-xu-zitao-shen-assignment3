import {useDispatch} from "react-redux";
import {setProp2} from "../redux/actions";


const UpdateOnly = () => {
    const dispatch = useDispatch();

    return <button onClick={() => dispatch(setProp2())}>Click Me!</button>
}


export default UpdateOnly;