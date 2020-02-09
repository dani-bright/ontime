import {getSongs} from "./getSongs";

export const getSongsSorted = state => getSongs(state).sort((a, b) => {
    return b.listened - a.listened
});