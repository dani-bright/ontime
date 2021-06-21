import {getSong} from "../song/getSong";
import {getPlaylist} from "./getPlaylist";
import {getPlaylistIndex} from "./getPlaylistIndex";

export const isNowPlayingSongPlaylist = (state) => (idSong) => {
    const song = getSong(state)(idSong);
    const playlist = getPlaylist(state);
    const songIndex = playlist.findIndex(playlistSong => playlistSong.id === song.id);
    return songIndex === getPlaylistIndex(state);
};