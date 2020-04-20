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

export const searchQuestionsService = (query) => {
    let url = `${API_URL}/api/questions/search?search=${query}`;
    return fetch(
        url,
        {
            credentials: 'include'
        }
    ).then(resp => {
        if (!resp.ok) {
            throw new Error("Error fetching response");
        }

        return resp.json();
    }).then(resp => {
        return resp.data;
    });
};

export default {
    createQuestionService,
    getQuestionService,
    searchQuestionsService,
}
