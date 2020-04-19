import CONSTANTS from "../common/constants";

const API_URL = `${CONSTANTS.BASE_URL}`;

let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const createQuestionService = (data) =>
    fetch(API_URL + `/api/questions`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {

        if (res.status === 200) {
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });

export const getQuestionService = () =>
    fetch(API_URL + `/api/questions`).then(res => {

        if (res.status === 200) {
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });

export default {
    createQuestionService,
    getQuestionService
}

