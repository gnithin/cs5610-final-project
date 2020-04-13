export const GET_PROFILE_DATA = "GET_PROFILE_DATA";

const getProfileData = (userProfileData) => ({
    type: GET_PROFILE_DATA,
    userProfileData: userProfileData
});

export default {
    getProfileData
}
