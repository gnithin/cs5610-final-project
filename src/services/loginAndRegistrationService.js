const PROD_URL = "https://web-dev-project-server.herokuapp.com";
// const LOCAL_API_URL = "http://10.0.0.138:2000";

const API_URL = PROD_URL;
let errorMessage = {
    responseCode: null,
    responseData: {}
};

export const loginService = (data) =>
    fetch(API_URL + `/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });


export const registerService = (data) =>
    fetch(API_URL + `/api/users/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });


export const logoutService = () =>
    fetch(API_URL + `/api/users/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });

export const currentLoggedInService = () =>
    fetch(API_URL + `/api/users/current`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            errorMessage.responseCode = res.status;
            errorMessage.responseData = res;

            return errorMessage
        }
    });


export default {
    loginService,
    registerService,
    logoutService,
    currentLoggedInService

}

