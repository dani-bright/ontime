export const SetNowPlaying = "now-playing/set-now-playing";

export const setNowPlaying = (song) => {
    return {
        type: SetNowPlaying,
        payload: {song}
    }
};