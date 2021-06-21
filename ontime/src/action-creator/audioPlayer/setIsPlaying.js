export const SetIsPlaying = "audio-player/set-is-playing";

export const setIsPlaying = (isPlaying) => {
    return {
        type: SetIsPlaying,
        payload: {isPlaying}
    }
};