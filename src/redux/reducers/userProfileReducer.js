
import {GET_PROFILE_DATA, SET_USER_DATA, SET_IS_LOGGEDIN} from "../actions/userProfileActions";

const initialState = {
    userDetails: {},
    isAdmin: false,
    isLoggedIn:null,
    userProfileData: {}
};
const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_DATA:
            console.log('DEBUG: GET_PRIVATE_PROFILE_DATA Reducer');

            return {
                ...state,
                userProfileData: action.userProfileData
            };

        case SET_USER_DATA:
            console.log('DEBUG: GET_USER_DATA Reducer');

            return {
                ...state,
                isAdmin: action.data.isAdmin,
                isLoggedIn:true,
                userDetails: action.data
            };
        case SET_IS_LOGGEDIN:
            return {
                ...state,
                isLoggedIn: action.data
            }


        default:
            return state;
    }

};

export default userProfileReducer;
