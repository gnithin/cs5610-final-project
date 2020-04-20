import CONSTANTS from "../common/constants";

export default class AdminUsersService {
    static async fetchAllUsers() {
        let url = `${CONSTANTS.BASE_URL}/api/users/all`;
        return fetch(
            url,
            {credentials: 'include'}
        ).then(resp => {
            if (!resp.ok) {
                throw new Error("couldn't fetch all users");
            }
            return resp.json()
        }).then(resp => {
            return resp.data;
        })
    }
}
