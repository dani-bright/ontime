import {getSongs} from "../song/getSongs";

export const getNowPlaying = state => state.nowPlaying || getSongs(state)[0];
