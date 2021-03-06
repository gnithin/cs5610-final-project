import CONSTANTS from "../common/constants";

const API_URL = `${CONSTANTS.BASE_URL}`;

let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const findQuestionDetails = (questionID) =>
    fetch(`${API_URL}/api/questions/${questionID}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(
        response => {
            if (response.status === 200) {
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
                return response.json();
            } else {
                errorMessage.responseCode = response.status;
                errorMessage.responseData = response;

                return errorMessage
            }
        });
};

const deleteQuestion = (questionId) => {
    return fetch(`${API_URL}/api/questions/${questionId}`, {
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
    return fetch(`${API_URL}/api/answers/${answerId}`, {
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

const upVoteAnswer = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}/upvote`, {
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

const downVoteAnswer = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}/downvote`, {
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

const deleteAnswerVote = (answerId) => {
    return fetch(`${API_URL}/api/answers/${answerId}/votes`, {
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

const upVoteQuestion = (questionId) => {
    return fetch(`${API_URL}/api/questions/${questionId}/upvote`, {
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

const downVoteQuestion = (questionId) => {
    return fetch(`${API_URL}/api/questions/${questionId}/downvote`, {
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

const deleteQuestionVote = (questionId) => {
    return fetch(`${API_URL}/api/questions/${questionId}/votes`, {
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
    upVoteAnswer,
    downVoteAnswer,
    deleteAnswerVote,
    upVoteQuestion,
    downVoteQuestion,
    deleteQuestionVote,
}
