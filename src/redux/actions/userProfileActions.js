export const GET_PROFILE_DATA = "GET_PROFILE_DATA";
export const SET_USER_DATA = "GET_USER_DATA";
export const SET_IS_LOGGEDIN = "SET_IS_LOGGEDIN";
export const RESET_LOGIN_STATUS = "RESET_LOGIN_STATUS";


const getProfileData = (userProfileData) => ({
    type: GET_PROFILE_DATA,
    userProfileData: userProfileData
});


const setUserData = (data) => ({
    type: SET_USER_DATA,
    data: data
});


const setIsLogin = (loginStatus, userData) => ({
    type: SET_IS_LOGGEDIN,
    loginStatus: loginStatus,
    userData: userData
});

const resetLoginStatus = () => ({
    type: RESET_LOGIN_STATUS
});

export default {
    getProfileData,
    setUserData,
    setIsLogin,
    resetLoginStatus
}
