import {SetSongs} from "../action-creator/songs/setSongs";

const initialState = [];

const songs = (state = initialState, action) => {
    switch (action.type) {
        case SetSongs:
            return action.payload.songs;

        default:
            return state
    }
};

export default songs