import {getUser} from "./getUser";
import {getSongs} from "./getSongs";

export const getUserFavorites = state => {
    const favSongIds =  getUser(state) && state.user.favorites.map(fav => fav.songId);
    return getUser(state) ? getSongs(state).filter(song =>  favSongIds.includes(song.id)) : null
};
