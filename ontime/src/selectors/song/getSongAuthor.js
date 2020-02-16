import {getSongs} from "./getSongs";

export const getSongAuthor = (state) => (idSong) => {
    const songs = getSongs(state).filter(song => song.id === idSong);
    return songs[0].authors
};
