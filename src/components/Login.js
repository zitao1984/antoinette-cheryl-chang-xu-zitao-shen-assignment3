import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { validateUser } from "../redux/actions";
import { LOGIN_STATE } from "../redux/storeConstants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt,faUser} from "@fortawesome/free-solid-svg-icons";


let editingBegun = false;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginState = useSelector(state => state.login.loginState);


    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(validateUser(username, password));
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
            <h2 className={"display-5 font-weight-bold text-dark"} >Sign in to post <FontAwesomeIcon icon={faUser}/></h2>
            <p> Using username:zitao password:1234</p>
            {
                !editingBegun && loginState === LOGIN_STATE.INVALID_LOGIN &&
                <div className="alert alert-danger" role="alert">Invalid username / password! Please try again.</div>
            }
            {
                !editingBegun && loginState === LOGIN_STATE.NETWORK_ERROR &&
                <div className="alert alert-danger" role="alert">Unable to connect to the server. Please check your internet connection.</div>
            }
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
                        Log in <FontAwesomeIcon icon={faSignInAlt}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
