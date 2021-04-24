import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ACTIONS, validateUser} from "../redux/actions";
import { LOGIN_STATE } from "../redux/stateConstants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt,faUser} from "@fortawesome/free-solid-svg-icons";


let editingBegun = false;

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const errMsg = useSelector(state => state.login.errMsg);
    const loginState = useSelector(state => state.login.loginState);

    const state = useSelector(state=>state)
    console.log(state)


    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(ACTIONS.register(username, password));
        clearForm();
    }

    const handleKeyPress = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleLogin();
        }
    }

    const clearForm = () => {
        editingBegun = false;
        setUsername("");
        setPassword("");
    }

    return (
        <div className={"bottom-container"}>
            <h2 className={"display-5 font-weight-bold text-dark"} >Sign up <FontAwesomeIcon icon={faUser}/></h2>
            <div className="row my-4 add-form">
                <div className="col-12 col-sm-2">
                    <label htmlFor="username" className="form-label   fst-italic h5">Username:</label>
                </div>
                <div className="col">
                    <input type="text" id="username" name="username"
                           className="form-control"
                           value={username} onChange={e => {
                        editingBegun = true;
                        setUsername(e.target.value);
                    }}
                           onKeyUp={e => handleKeyPress(e)}
                    />
                </div>
            </div>
            <div className="row my-4 add-form">
                <div className="col-12 col-sm-2">
                    <label htmlFor="password" className="form-label  fst-italic h5">Password:</label>
                </div>
                <div className="col">
                    <input type="password" id="password" name="password"
                           className="form-control"
                           value={password} onChange={e => {
                        editingBegun = true;
                        setPassword(e.target.value);
                    }}
                           onKeyUp={e => handleKeyPress(e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-secondary float-end" onClick={handleLogin}>
                        Sign up <FontAwesomeIcon icon={faSignInAlt}/>
                    </button>
                </div>
            </div>
            <p className="text-danger my-2">{errMsg}</p>

        </div>
    )
}

export default SignUp;