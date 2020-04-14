const PROD_URL = "https://web-dev-project-server.herokuapp.com/api/users";
// const LOCAL_API_URL = "http://localhost:2000";

const API_URL = PROD_URL;
let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const getUserProfileData = () =>
    fetch(`${API_URL}/details/32`).then(
        response => {
            if (response.ok) {
                console.log("DEBUG: Response 200");
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        });

export default {
    getUserProfileData
}
