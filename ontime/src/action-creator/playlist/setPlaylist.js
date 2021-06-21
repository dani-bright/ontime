export const SetPlaylist = "playlist/set-playlist";

export const setPlaylist = (songs) => {
    return {
        type: SetPlaylist,
        payload: {songs}
    }
};