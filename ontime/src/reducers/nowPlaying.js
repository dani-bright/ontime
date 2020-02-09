import {SetNowPlaying} from "../action-creator/setNowPlaying";

const initialState = {
    //saving me a lot of troubles !
    nowPlaying: {
        id: 3,
        name: "Ready Or Not",
        img: "meek.jpg",
        audio: "Ready Or Not.mp3",
        categoryId: 2,
        listened: 6,
        createdAt: "2020-02-06T11:59:27.000Z",
        updatedAt: "2020-02-09T03:12:35.000Z",
        authors: [{id: 2, name: "Meek mill"}],
        length: 1,
        albums: []
    }
};

const nowPlaying = (state = initialState, action) => {
    switch (action.type) {
        case SetNowPlaying:
            return action.payload.song;
        default:
            return state
    }
};

export default nowPlaying;