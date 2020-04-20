import {combineReducers} from "redux";
import questionReducer from "./questionReducer";
import userProfileReducer from "./userProfileReducer";
import adminUsersReducer from "./adminUsersReducer";

export default combineReducers({
    question: questionReducer,
    userProfile: userProfileReducer,
    adminUsers: adminUsersReducer,
})
