import {getUser} from "./getUser";

export const getUserFavorites = state => {
    return getUser(state) ? state.user.favorites.filter(favorite => favorite.songId) : null
};
