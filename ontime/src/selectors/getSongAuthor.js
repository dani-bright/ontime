export const getSongAuthor = (state) => (idSong) => {
    const songs = state.songs.filter(song => song.id === idSong);
    return songs[0].authors
};
