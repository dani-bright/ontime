import {SetAudioPlayer} from "../action-creator/audioPlayer/setAudioPlayer";
import {SetIsPlaying} from "../action-creator/audioPlayer/setIsPlaying";

const initialState = {
    player: null,
    isPlaying: false
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
        default:
            return state
    }
};

export default audioPlayer;