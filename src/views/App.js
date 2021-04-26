import { Provider, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";
import MainView from "./MainView";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import PostCreator from "../components/PostCreator";
import CommentBoard from "../components/CommentBoard";
import uuid from "react-uuid";
import {emptyPost, NOTE_TYPE} from "../redux/stateConstants";
import PostBoard from "../components/PostBoard";
import PostText from "../components/PostText";
import {useEffect} from "react";
import Login from "../components/Login";
import SignUp from "../components/signUp";
import {useSelector} from "react-redux";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.getPosts());
    dispatch(ACTIONS.initLogin())

  }, [dispatch])

  // const postID = useSelector(state =>state.posts.posts)
  // console.log(state)

  const newPost = () => {
    return {
      type: NOTE_TYPE.TEXT,
      text: "kkkkkk",
      url: "",
      title: "Test Post",
      timestamp: new Date().getTime(),
      userID: "123",
      username: "post-generator",
    };
  }

  const testPost =newPost()

  // import {useSelector} from "react-redux";
  // const currentPost = useSelector(state=>state.posts.posts)
  // console.log(currentPost)


  return (

  <Router>
    <Switch>
      <Route path="/test">
        <MainView />
      </Route>
      <Route path="/postcreate">
        <PostCreator postID={"0"} post={emptyPost} />
      </Route>
      <Route path="/comment">
        <CommentBoard post={testPost} postID={"CPoPrlvrO7nkNt3dQh8Y"} />
      </Route>
      <Route path="/post">
        <PostBoard />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      {/*"/comment/:postId"*/}
            {/*<Route path={"/post/:postId"}>*/}
            {/*  <PostText post={somePostObject}/>*/}
            {/*</Route>*/}
            {/*<Route path={"/post/zitaoshen"}>*/}
            {/*  <div>hello</div>*/}
            {/*</Route>*/}


    </Switch>
  </Router>
  );
}

export default App;
