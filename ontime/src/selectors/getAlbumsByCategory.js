export const getAlbumsByCategory = (state) => (idCategory) => {
    return state.albums.filter(album => album.categoryId == idCategory);
};
