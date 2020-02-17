import {getAlbums} from "./getAlbums";

export const getAlbumsByCategory = (state) => (idCategory) => {
    return idCategory !== 0 ? getAlbums(state).filter(album => album.categoryId === idCategory) : getAlbums(state);
};
