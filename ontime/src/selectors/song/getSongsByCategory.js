export const getSongsByCategory = (state) => (idCategory) => {
    return state.songs.filter(song => song.categoryId === idCategory);
};
