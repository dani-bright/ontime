import {getUserFavorites} from "./user/getUserFavorites";
import {getSongs} from "./song/getSongs";

export const getFavoritesSongs = (state) => {
    const favSongIds = getUserFavorites(state).map(fav => fav.songId);
    return getSongs(state).filter(song => favSongIds.includes(song.id));
};
