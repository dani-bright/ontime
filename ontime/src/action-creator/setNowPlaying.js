export const SetNowPlaying = "now-playing/set-now-playing";

export const setNowPlaying = (song) => {
    console.log("HOOOOOOOOOOOO FDP")
    return {
        type: SetNowPlaying,
        payload: {song}
    }
};