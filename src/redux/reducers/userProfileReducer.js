import {GET_PROFILE_DATA} from "../actions/userProfileActions";

const initialState = {
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

        default:
            return state;
    }

};

export default userProfileReducer;
