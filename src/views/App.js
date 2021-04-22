import { Provider, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";
import MainView from "./MainView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostCreator from "../components/PostCreator";
import CommentBoard from "../components/CommentBoard";
import uuid from "react-uuid";
const App = () => {

  const dispatch = useDispatch();
  dispatch(ACTIONS.getPosts());

  const newPost = () => {
    return {
      type: "TEXT",
      text: "kkkkkk",
      url: "",
      title: "Test Post",
      timestamp: new Date().getTime(),
      userID: "123",
      username: "post-generator",
    };
  }

  const testPost =newPost()


  return (

  <Router>
    <Switch>
      <Route path="/test">
        <MainView />
      </Route>
      <Route path="/postcreate">
        <PostCreator />
      </Route>
      <Route path="/comment">
        <CommentBoard post={testPost} postID={"CPoPrlvrO7nkNt3dQh8Y"} />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
