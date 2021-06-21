import {getSongs} from "./getSongs";

export const getSongsSortedByListened = state => getSongs(state).sort((a, b) => {
    return b.listened - a.listened
});