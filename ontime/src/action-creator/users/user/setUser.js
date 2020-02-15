export const SetUser = "user/set-user";

export const setUser = (user) => {
    return {
        type: SetUser,
        payload: {user}
    }
};