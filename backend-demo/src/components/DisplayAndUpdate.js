import {useSelector, useDispatch} from "react-redux";
import {setProp1} from "../redux/actions";


const DisplayAndUpdate = () => {
    const prop1 = useSelector(state => state.stateProp1);
    const prop2 = useSelector(state => state.stateProp2);
    
    const dispatch = useDispatch();

    const onTextChange = (event) => dispatch(setProp1(event.target.value));

    return (
        <>
            <p>stateProp2: {prop2}</p>
            <p>
                <label htmlFor="changeProp1">Change stateProp1:</label>
                <input id="changeProp1" type="text" value={prop1} 
                        onChange={(e) => onTextChange(e)} />
            </p>
        </>
    )
}

export default DisplayAndUpdate;