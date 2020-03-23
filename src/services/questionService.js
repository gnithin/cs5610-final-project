const PROD_URL = "https://web-dev-project-server.herokuapp.com";
const LOCAL_API_URL = "http://localhost:2000";
const API_URL = PROD_URL;
let errorMessage = {
    responseCode: null,
    responseData: {}
}
export const createQuestionService = (data) =>
    fetch(API_URL + `/api/questions`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {

        if (res.status === 200) {
            console.log("inside 200");
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });

export default {
    createQuestionService
}

