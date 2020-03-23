import {CREATE_QUESTION} from "../actions/questionActions";

const initialState = {
    questionList: []
};
const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION:
            console.log("inside create question reducer",action.questionData)

            return {
                ...state,
                questionList: [
                    ...state.questionList,
                    action.questionData
                ]
            };

        default:
            return state;
    }

};
export default questionReducer;
