import {getSong} from "../song/getSong";
import {getNowPlaying} from "./getNowPlaying";
import {isEqual} from "lodash";

export const isNowPlaying = (state) => (idSong) => {
    return isEqual(getNowPlaying(state), getSong(state)(idSong));
};