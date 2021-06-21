import {SetNowPlaying} from "../action-creator/setNowPlaying";

const initialState = null;

const nowPlaying = (state = initialState, action) => {
    switch (action.type) {
        case SetNowPlaying:
            return action.payload.song;
        default:
            return state
    }
};

export default nowPlaying;