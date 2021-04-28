import { useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PostCreator from "../components/PostCreator";
import { NOTE_TYPE } from "../redux/stateConstants";
import PostBoard from "../components/PostBoard";
import PostText from "../components/PostText";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.getPosts());
    dispatch(ACTIONS.initLogin());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/post" exact component={PostBoard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/postcreate/:postID" component={PostCreator} />
        <Route path="/posttext/:postID" component={PostText} />
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/post" />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
