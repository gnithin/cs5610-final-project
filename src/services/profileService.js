import CONSTANTS from "../common/constants";

const API_URL = `${CONSTANTS.BASE_URL}/api/users`;

let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const getUserProfileData = (userId) =>
    fetch(`${API_URL}/details/${userId}`, {
        credentials: 'include'
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('DEBUG: Error getting profile data');
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        });

export default {
    getUserProfileData
}
