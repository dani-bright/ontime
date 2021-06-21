export const SetPlaylistIndex = "playlist/set-index";

export const setPlaylistIndex = (index) => {
    return {
        type: SetPlaylistIndex,
        payload: {index}
    }
};