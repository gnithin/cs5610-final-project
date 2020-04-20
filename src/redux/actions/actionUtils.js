export default class ActionUtils {
    static createAction(actionName, actionData) {
        return {
            type: actionName,
            data: actionData,
        }
    }
}
