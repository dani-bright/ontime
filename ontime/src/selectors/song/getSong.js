export const getSong = (state) => (idSong) => {
    const songs = state.songs.filter(song => song.id === idSong);
    return songs[0]
};
