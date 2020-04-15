const PROD_URL = "https://web-dev-project-server.herokuapp.com";
// const LOCAL_API_URL = "http://localhost:2000";

const API_URL = PROD_URL;
let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const findQuestionDetails = (questionID) =>
    fetch(`${API_URL}/api/questions/${questionID}`,{
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
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

export const createAnswerForQuestion = (answer, questionId) => {
    return fetch(`${API_URL}/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(answer),
        credentials: 'include'
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

const deleteQuestion = (questionId) => {
    return fetch(`${API_URL}/api/questions/${questionId}`,{
        method: 'DELETE',
        credentials: 'include'
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        }
    );
};

const deleteAnswer = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}`,{
        method: 'PUT',
        credentials: 'include'
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        }
    );
};
const upvoteAnswer = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}/upvote`,{
        method: 'PUT',
        credentials: 'include'
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        }
    );
};

const downvoteAnswer = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}/downvote`,{
        method: 'PUT',
        credentials: 'include'
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        }
    );
};

const deleteVote = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}/votes`,{
        method: 'DELETE',
        credentials: 'include'
    }).then(
        response => {
            if (response.ok) {
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        }
    );
};

export default {
    findQuestionDetails,
    createAnswerForQuestion,
    deleteQuestion,
    deleteAnswer,
    upvoteAnswer,
    downvoteAnswer,
    deleteVote
}

