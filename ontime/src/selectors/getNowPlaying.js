import {getSongs} from "./getSongs";

export const getNowPlaying = state => state.nowPlaying || getSongs(state)[0];
