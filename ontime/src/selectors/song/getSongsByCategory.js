import {getSongs} from "./getSongs";

export const getSongsByCategory = (state) => (idCategory) => {
    return getSongs(state).filter(song => song.categoryId === idCategory);
};
