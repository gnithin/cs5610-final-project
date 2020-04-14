const PROD_URL = "https://web-dev-project-server.herokuapp.com/api/users";
// const LOCAL_API_URL = "http://localhost:2000";

const API_URL = PROD_URL;
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
