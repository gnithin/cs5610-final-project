import {RESET_SEARCH_QUESTION_RESULTS, SET_SEARCH_QUESTION_RESULTS} from "../actions/searchQuestionsActions";

let initialState = {
    questions: [],
    query: "",
};

const searchQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUESTION_RESULTS: {
            return {
                ...state,
                questions: action.data.questions,
                query: action.data.query,
            }
        }

        case RESET_SEARCH_QUESTION_RESULTS: {
            return {
                ...state,
                ...initialState,
            }
        }

        default:
            return state;
    }
};

export default searchQuestionsReducer;
