import {GET_PROFILE_DATA, RESET_LOGIN_STATUS, SET_IS_LOGGEDIN, SET_USER_DATA} from "../actions/userProfileActions";

const initialState = {
    userDetails: {},
    isAdmin: false,
    isLoggedIn: null,
    userProfileData: {}
};
const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_DATA:
            return {
                ...state,
                userProfileData: action.userProfileData
            };

        case SET_USER_DATA:
            return {
                ...state,
                isAdmin: action.data.isAdmin,
                isLoggedIn: true,
                userDetails: action.data
            };

        case SET_IS_LOGGEDIN:
            return {
                ...state,
                isLoggedIn: action.loginStatus,
                isAdmin: action.userData.isAdmin,
                userDetails: action.userData
            };

        case RESET_LOGIN_STATUS:
            return {
                ...state,
                userDetails: {},
                isAdmin: false,
                isLoggedIn: null
            };

        default:
            return state;
    }

};

export default userProfileReducer;
