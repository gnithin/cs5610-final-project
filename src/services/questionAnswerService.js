const PROD_URL = "https://web-dev-project-server.herokuapp.com";
const LOCAL_API_URL = "http://localhost:2000";
const API_URL = PROD_URL;
let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const findQuestionDetails = (questionID) =>
    fetch(`${API_URL}/api/questions/${questionID}`).then(
        response => {
            if (response.status === 200) {
                console.log("DEBUG: Response 200");
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        });

export const createAnswerForQuestion = (answer, questionId) => {
    console.log("DEBUG: Service Answer data", answer);
    console.log("DEBUG: API URL", `${API_URL}/api/answers/question/${questionId}`);
    return fetch(`${API_URL}/api/answers/question/${questionId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(answer)
    }).then(
        response => {
            if (response.status === 200) {
                console.log("DEBUG: Response 200");
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        });
};

export default {
    findQuestionDetails,
    createAnswerForQuestion
}

