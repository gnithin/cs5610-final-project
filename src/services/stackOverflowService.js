const PROD_URL = "https://api.stackexchange.com/2.2";
const API_URL = PROD_URL;

export const searchQuestions = (data) =>
    fetch(API_URL + `/search?order=desc&sort=activity&intitle=${data}&site=stackoverflow`)
        .then(res => {

            if (res.status === 200) {
                console.log("inside 200");
                return res.json()
            } else {

            }
        });

export default {
    searchQuestions,
}

