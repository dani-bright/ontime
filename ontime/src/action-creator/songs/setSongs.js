export const SetSongs = "song/set-songs";

export const setSongs = (songs) => {
    return {
        type: SetSongs,
        payload: {songs}
    }
};