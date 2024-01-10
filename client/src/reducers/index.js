import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import getLocationReducer from "./getLocation";
import themeReducer from "./theme";

const Reducers = combineReducers({
    authReducer,
    currentUserReducer,
    getLocationReducer,
    themeReducer
});

export default Reducers;
