import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS, validateUser } from "../redux/actions";
import { LOGIN_STATE } from "../redux/stateConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

let editingBegun = false;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const errMsg = useSelector((state) => state.login.errMsg);
  const loginState = useSelector((state) => state.login.loginState);
  const postID = "0";

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(ACTIONS.regularLogin(username, password));
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
        {loginState === LOGIN_STATE.LOGGED_IN ? (
          //   <div className="post-generator my-3 post-card">
          <div className="title">
            <h1 className="text-center">
              Welcome back, {user}! <FontAwesomeIcon icon={faUser} />
            </h1>
            <div className="padding-30">
              <Link to={"/postcreate/" + postID}>
                <button type="button" className="btn btn-primary btn-lg">
                  Create a Post
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center">
              Log In <FontAwesomeIcon icon={faUser} />
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
                  x
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
                <button className="btn btn-secondary" onClick={handleLogin}>
                  Log In <FontAwesomeIcon icon={faSignInAlt} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
