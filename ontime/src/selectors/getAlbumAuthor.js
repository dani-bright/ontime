import {getAlbums} from "./getAlbums";
import {getAuthors} from "./getAuthors";

export const getAlbumAuthor = (state) => (idAlbum) => {
    const albumAuthorId = getAlbums(state).filter(album => album.id === idAlbum).map(album => album.authorId)[0];
    return getAuthors(state) && getAuthors(state).filter(author => author.id == albumAuthorId)[0]
};