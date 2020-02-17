import {getSongsByCategory} from "./getSongsByCategory";

export const getSongsByCategorySorted = (state) => (idCategory) => {
    const songs = getSongsByCategory(state)(idCategory);
    return songs.sort((a, b) => a.listened + b.listened);
};
