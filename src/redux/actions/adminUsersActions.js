import ActionUtils from "./actionUtils";

export const SET_ADMIN_USERS_RESULTS = "set-admin-user-results";

export default class AdminUsersActions {
    static setUsers(users) {
        return ActionUtils.createAction(SET_ADMIN_USERS_RESULTS, users)
    }
}
