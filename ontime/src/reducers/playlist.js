import {SetPlaylist} from "../action-creator/playlist/setPlaylist";
import {SetPlaylistIndex} from "../action-creator/playlist/setPlaylistIndex";

const initialState = {
    songs: [],
    index: 0
};

const playlist = (state = initialState, action) => {
    switch (action.type) {
        case SetPlaylist:
            return {
                ...state,
                songs: action.payload.songs
            };
        case SetPlaylistIndex:
            return {
                ...state,
                index: action.payload.index
            };
        default:
            return state
    }
};

export default playlist;