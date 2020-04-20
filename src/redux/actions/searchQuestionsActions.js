import ActionUtils from "./actionUtils";

export const SET_SEARCH_QUESTION_RESULTS = "set-search-question-results";
export const RESET_SEARCH_QUESTION_RESULTS = "reset-search-question-results";

export default class SearchQuestionActions {
    static setResults(results) {
        return ActionUtils.createAction(SET_SEARCH_QUESTION_RESULTS, results)
    }

    static resetResults(results) {
        return ActionUtils.createAction(RESET_SEARCH_QUESTION_RESULTS, results)
    }
}
