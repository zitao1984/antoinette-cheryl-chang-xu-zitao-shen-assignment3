import {useSelector} from "react-redux";


const DisplayOnly = () => {
    const localStateName = useSelector(state => state.stateProp1);
    return <p>{localStateName}</p>
}

export default DisplayOnly;