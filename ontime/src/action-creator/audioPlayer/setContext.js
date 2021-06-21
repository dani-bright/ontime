export const SetContext = "audio-player/set-context";

export const setContext = (context) => {
    return {
        type: SetContext,
        payload: {context}
    }
};