import {getNowPlaying} from "./getNowPlaying";
import {getSong} from "./getSong";

export const isNowPlaying = (state) => (idSong) => {
    const song = getSong(state)(idSong);
    return getNowPlaying(state) === song;
}