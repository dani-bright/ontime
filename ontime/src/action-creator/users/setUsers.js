export const SetUsers = "users/set-users";

export const setUsers = (users) => {
    return {
        type: SetUsers,
        payload: {users}
    }
};