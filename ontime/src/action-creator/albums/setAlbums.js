export const SetAlbums = "album/set-albums";

export const setAlbums = (albums) => {
    return {
        type: SetAlbums,
        payload: {albums}
    }
};