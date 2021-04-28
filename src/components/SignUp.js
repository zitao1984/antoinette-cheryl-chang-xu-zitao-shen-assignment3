import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS, validateUser } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

let editingBegun = false;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errMsg = useSelector((state) => state.login.errMsg);
  const loginState = useSelector((state) => state.login.loginState);


  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(ACTIONS.register(username, password));
    clearForm();
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleLogin();
    }
  };

  const clearForm = () => {
    editingBegun = false;
    setUsername("");
    setPassword("");
  };

  return (
    <div className="main-container padding-10">
      <div className={"title"}>
        <h1 className="text-center">
          Sign Up <FontAwesomeIcon icon={faUserPlus} />
        </h1>
        <div className="row my-4 add-form">
          <div className="col-12 col-sm-2">
            <label htmlFor="username" className="form-label h5">
              Username:
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => {
                editingBegun = true;
                setUsername(e.target.value);
              }}
              onKeyUp={(e) => handleKeyPress(e)}
            />
          </div>
        </div>
        <div className="row my-4 add-form">
          <div className="col-12 col-sm-2">
            <label htmlFor="password" className="form-label h5">
              Password:
            </label>
          </div>
          <div className="col">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                editingBegun = true;
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => handleKeyPress(e)}
            />
          </div>
        </div>
        <div className="row">
          <p className="text-danger">{errMsg}</p>
          <div className="col">
            <Link to="/login">
              <button className="btn btn-secondary" onClick={handleLogin}>
                Sign up <FontAwesomeIcon icon={faSignInAlt} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
