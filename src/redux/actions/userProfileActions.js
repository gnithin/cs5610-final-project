export const GET_PROFILE_DATA = "GET_PROFILE_DATA";

export const SET_USER_DATA = "GET_USER_DATA";

export const SET_IS_LOGGEDIN = "SET_IS_LOGGEDIN";


const getProfileData = (userProfileData) => ({
    type: GET_PROFILE_DATA,
    userProfileData: userProfileData
});


const setUserData = (data) => ({
    type: SET_USER_DATA,
    data: data
});


const setIsLogin = (data) => ({
    type: SET_IS_LOGGEDIN,
    data: data
});

export default {
    getProfileData,
    setUserData,
    setIsLogin

}
