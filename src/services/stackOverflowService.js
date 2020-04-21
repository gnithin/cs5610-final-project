const API_URL = "https://api.stackexchange.com/2.2";

export const searchQuestions = (data) =>
    fetch(API_URL + `/search/advanced?order=desc&sort=activity&q=${data}&site=stackoverflow`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        });

export default {
    searchQuestions,
}

