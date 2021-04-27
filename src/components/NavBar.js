import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useState, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";
import { emptyPost, LOGIN_STATE } from "../redux/stateConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginState = useSelector((state) => state.login.loginState);
  // const postID = props.match.params.postID;
  const postID = "0";
  const post = emptyPost;

  return (
    <div className="nav">
      <div className="nav-title">
        <h1>
          <strong>Good News!</strong>
        </h1>
        <div>A website for all the good things happening in the world</div>
      </div>
      <div className="nav-row">
        <div>
          <div className="padding-10">
            <Link to="/post">
              <button type="button" className="btn btn-light btn-lg">
                Home
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="padding-10">
            {loginState === LOGIN_STATE.LOGGED_IN ? (
              <div className="post-row">
                <Link to="/login">
                  <button type="button" className="btn btn-light btn-lg">
                    {user} <FontAwesomeIcon icon={faUserCog} />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="post-row">
                <Link to="/login">
                  <button type="button" className="btn btn-light btn-lg">
                    Log In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="padding-10">
            {loginState === LOGIN_STATE.LOGGED_IN ? (
              <div className="post-row">
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-light btn-lg"
                    onClick={() => dispatch(ACTIONS.logOut(user))}
                  >
                    Log Out
                  </button>
                </Link>
              </div>
            ) : (
              <div className="post-row">
                <Link to="/signup">
                  <button type="button" className="btn btn-light btn-lg">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
