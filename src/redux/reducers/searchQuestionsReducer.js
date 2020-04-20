import {SET_SEARCH_QUESTION_RESULTS} from "../actions/searchQuestionsActions";

let initialState = {
    questions: []
};

const searchQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUESTION_RESULTS: {
            return {
                ...state,
                questions: action.data,
            }
        }

        default:
            return state;
    }
};

export default searchQuestionsReducer;
