export const GET_QUESTION = "GET_QUESTION";
export const getQuestion = (questionList) => ({
    type: GET_QUESTION,
    data: questionList
})



export const CREATE_QUESTION = "CREATE_QUESTION"
export const createQuestion = (question) => ({
    type: CREATE_QUESTION,
    questionData: question
})
