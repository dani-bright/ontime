import {getUserFavorites} from "./user/getUserFavorites";
import {getSongs} from "./song/getSongs";

export const getFavoritesByCategory = (state) => (idCategory) => {
    const favSongIds = getUserFavorites(state).map(fav => fav.songId);
    const songs = idCategory !== 0 ? getSongs(state).filter(song => song.categoryId === idCategory && favSongIds.includes(song.id))
        : getSongs(state).filter(song => favSongIds.includes(song.id));
    const songsIds = songs.map(song => song.id);
    return state.user.favorites.filter(fav => songsIds.includes(fav.songId));
};
