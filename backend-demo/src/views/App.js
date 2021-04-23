/**
 * @author Chang Xu
 * @email xu.chang1@northeastern.edu
 * @create date 2021-04-22 23:39:06
 * @modify date 2021-04-23 00:19:30
 */
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";
import store from "../redux/store"; 
import MainView from "./MainView";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ACTIONS.getPosts());
    dispatch(ACTIONS.initLogin());
  }, [dispatch])

  return (
      <MainView />
  );
}

export default App;
