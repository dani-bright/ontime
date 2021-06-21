import {SetAudioPlayer} from "../action-creator/audioPlayer/setAudioPlayer";
import {SetIsPlaying} from "../action-creator/audioPlayer/setIsPlaying";
import {SetCurrentTime} from "../action-creator/audioPlayer/setCurrentTime";
import {SetContext} from "../action-creator/audioPlayer/setContext";

const initialState = {
    player: null,
    isPlaying: false,
    currentTime: 0,
    context: null,
};

const audioPlayer = (state = initialState, action) => {
    switch (action.type) {
        case SetAudioPlayer:
            return {
                ...state,
                player: action.payload.audioTag
            };
        case SetIsPlaying:
            return {
                ...state,
                isPlaying: action.payload.isPlaying
            };
        case SetCurrentTime:
            return {
                ...state,
                currentTime: action.payload.currentTime
            };
        case SetContext:
            return {
                ...state,
                context: action.payload.context
            };
        default:
            return state
    }
};

export default audioPlayer;