import { Provider, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";
import store from "../redux/store"; 
import MainView from "./MainView";

const App = () => {

  const dispatch = useDispatch();
  dispatch(ACTIONS.getPosts());

  return (
      <MainView />
  );
}

export default App;
