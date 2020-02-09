import {getUserFavorites} from "./getUserFavorites";

export const getFavoritesByCategory = (state) => (idCategory) => {
    return getUserFavorites(state).filter(favoriteSong => favoriteSong.idCategory === idCategory);
};
