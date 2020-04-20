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

    static async setUserAsAdmin(userId) {
        let url = `${CONSTANTS.BASE_URL}/api/users/set/admin/${userId}`;
        return fetch(
            url,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }
        ).then(resp => {
            if (!resp.ok) {
                throw new Error("couldn't fetch all users");
            }
            return resp.json()
        }).then(resp => {
            return resp.data;
        })
    }

    static async unsetUserAsAdmin(userId) {
        let url = `${CONSTANTS.BASE_URL}/api/users/unset/admin/${userId}`;
        return fetch(
            url,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }
        ).then(resp => {
            if (!resp.ok) {
                throw new Error("couldn't fetch all users");
            }
            return resp.json()
        }).then(resp => {
            return resp.data;
        })
    }

    static async deleteUser(userId) {
        let url = `${CONSTANTS.BASE_URL}/api/users/${userId}`;
        return fetch(
            url,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }
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
