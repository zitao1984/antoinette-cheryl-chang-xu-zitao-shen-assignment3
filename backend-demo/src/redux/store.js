import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {INITIAL_STATE} from "./stateConstants";



function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        //TODO
    }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));