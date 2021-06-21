import {getSongs} from "./getSongs";

export const getSongsByCategory = (state) => (idCategory) => {
    return idCategory !== 0 ? getSongs(state).filter(song => song.categoryId === idCategory) : getSongs(state);
};
