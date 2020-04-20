import {SET_ADMIN_USERS_RESULTS} from "../actions/adminUsersActions";

let initialState = {
    users: []
};

const adminUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN_USERS_RESULTS: {
            return {
                ...state,
                users: [...action.data],
            };
        }

        default:
            return state;
    }
};

export default adminUsersReducer
