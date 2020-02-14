import {getSong} from "../song/getSong";
import {getNowPlaying} from "./getNowPlaying";

export const isNowPlaying = (state) => (idSong) => {
    return getNowPlaying(state) === getSong(state)(idSong);
};