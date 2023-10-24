import { combineReducers } from "redux";
import BlogReducer from "./BlogReducer";

export default combineReducers({
    // add reducers here
    blogs: BlogReducer,
});
