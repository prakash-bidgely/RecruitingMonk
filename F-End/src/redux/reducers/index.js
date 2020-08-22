import { combineReducers } from "redux";
import authReducer from "./authReducer";
// import other reducers

const rootReducer = combineReducers({
    // Key Value map of reducers
    auth: authReducer
});

export default rootReducer;
