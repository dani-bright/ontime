import {SetAlbums} from "../action-creator/albums/setAlbums";

const initialState = [];

const albums = (state = initialState, action) => {
    switch (action.type) {
        case SetAlbums:
            return action.payload.albums;

        default:
            return state
    }
};

export default albums;