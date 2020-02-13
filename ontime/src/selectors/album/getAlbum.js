import {getAlbums} from "./getAlbums";

export const getAlbum = (state) => (idAlbum) => {
    const albums = getAlbums(state).filter(album => album.id === idAlbum);
    return albums[0]
};
