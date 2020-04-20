import ActionUtils from "./actionUtils";

export const SET_SEARCH_QUESTION_RESULTS = "set-search-question-results";
export const RESET_SEARCH_QUESTION_RESULTS = "reset-search-question-results";

export default class SearchQuestionActions {
    static setResults(results, query) {
        return ActionUtils.createAction(SET_SEARCH_QUESTION_RESULTS, {
            questions: results,
            query: query,
        })
    }

    static resetResults() {
        return ActionUtils.createAction(RESET_SEARCH_QUESTION_RESULTS, null)
    }
}
