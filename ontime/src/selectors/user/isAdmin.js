import {getUser} from "./getUser";

export const isAdmin = (state) => {
    const roleNames = getUser(state) && getUser(state).roles.map(role => role.name);
    return roleNames && roleNames.includes("ROLE_ADMIN");
};