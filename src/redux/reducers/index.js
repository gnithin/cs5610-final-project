import {combineReducers} from "redux";
import questionReducer from "./questionReducer";

export default combineReducers({
    question: questionReducer,
})
