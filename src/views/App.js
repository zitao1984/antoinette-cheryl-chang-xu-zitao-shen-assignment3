import { Provider, useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../redux/actions";
import MainView from "./MainView";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PostCreator from "../components/PostCreator";
import CommentBoard from "../components/CommentBoard";
import uuid from "react-uuid";
import { emptyPost, NOTE_TYPE } from "../redux/stateConstants";
import PostBoard from "../components/PostBoard";
import PostText from "../components/PostText";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Login from "../components/Login";
import SignUp from "../components/signUp";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.getPosts());
    dispatch(ACTIONS.initLogin());
  }, [dispatch]);

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
  };

  const testPost = newPost();

  // const currentPost = useSelector((state) => state.posts.posts);

  // console.log(currentPost);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/test" component={MainView} />
        <Route path="/post" exact component={PostBoard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/postcreate/:postID" component={PostCreator} />
        {/* <Route path="/comments/:postID" component={CommentBoard} /> */}
        {/* <Route path="/text/:postID" component={PostText} /> */}
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

    // <Router>
    //   <Switch>
    //     <Route path="/test">
    //       <MainView />
    //     </Route>
    //     <Route path="/postcreate">
    //       <PostCreator postID={"0"} post={emptyPost} />
    //     </Route>
    //     <Route path="/comment">
    //       <CommentBoard post={testPost} postID={"CPoPrlvrO7nkNt3dQh8Y"} />
    //     </Route>
    //     <Route path="/post">
    //       <PostBoard />
    //     </Route>
    //     <Route path="/login">
    //       <Login />
    //     </Route>
    //     <Route path="/signup">
    //       <SignUp />
    //     </Route>

    //           {/*<Route path={"/post/:postId"}>*/}
    //           {/*  <PostText post={testPost}/>*/}
    //           {/*</Route>*/}
    //           {/*<Route path={"/post/zitaoshen"}>*/}
    //           {/*  <div>hello</div>*/}
    //           {/*</Route>*/}

    //   </Switch>
    // </Router>
  );
};

export default App;
