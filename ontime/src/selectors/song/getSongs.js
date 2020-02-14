export const getSongs = state => state.songs.sort((a, b) => {
    return b.id - a.id
});;
