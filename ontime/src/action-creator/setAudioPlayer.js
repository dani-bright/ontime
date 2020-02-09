export const SetAudioPlayer = "audio-player/set-audio-player";

export const setAudioPlayer = (audioTag) => {
    return {
        type: SetAudioPlayer,
        payload: {audioTag}
    }
};