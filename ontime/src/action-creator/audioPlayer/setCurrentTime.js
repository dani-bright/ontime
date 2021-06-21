export const SetCurrentTime = "audio-player/set-current-time";

export const setCurrentTime = (currentTime) => {
    return {
        type: SetCurrentTime,
        payload: {currentTime}
    }
};