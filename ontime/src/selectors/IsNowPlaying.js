import {getSong} from "./getSong";
import {getPlaylist} from "./getPlaylist";
import {getPlaylistIndex} from "./getPlaylistIndex";

export const isNowPlaying = (state) => (idSong) => {
    const song = getSong(state)(idSong);
    const playlist = getPlaylist(state);
    const songIndex = playlist.findIndex(playlistSong => playlistSong.id === song.id);
    return songIndex === getPlaylistIndex(state);
};