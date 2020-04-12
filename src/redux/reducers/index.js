import {combineReducers} from "redux";
import questionReducer from "./questionReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
    question: questionReducer,
    userProfile: userProfileReducer
})
