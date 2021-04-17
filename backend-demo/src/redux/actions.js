import firebase from "../fbConfig";
import { UPDATE_PROP1, INCREMENT_PROP2 } from "./actionConstants";

// Action creator functions
export const setProp1 = (val) => ({
    type: UPDATE_PROP1,
    payload: {
        prop1: val
    }
});

export const setProp2 = () => ({
    type: INCREMENT_PROP2
})