import {SetAudioPlayer} from "../action-creator/setAudioPlayer";

const initialState = {
    audioPlayer: null
};

const audioPlayer = (state = initialState, action) => {
    switch (action.type) {
        case SetAudioPlayer:
            return action.payload.audioTag;
        default:
            return state
    }
};

export default audioPlayer;