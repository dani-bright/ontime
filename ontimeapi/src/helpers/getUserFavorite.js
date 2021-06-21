import Favorite from "../models/Favorite";
import Album from "../models/Album";
import Song from "../models/Song";

export const getUserFavorite = async (user) => {
    const favorites = await Favorite.findAll(
        {
            where: {
                userId: user.id
            }
        });

    //separate the songs from the albums
    const albumIds = favorites.filter(favorite => favorite.albumId);
    const songIds = favorites.filter(favorite => favorite.songId);
    const albumPromises = albumIds.map(async (favorite) => await Album.findOne({where: {id: favorite.albumId}}));
    const songPromises = songIds.map(async (favorite) => await Song.findOne({where: {id: favorite.songId}}));
    const albums = await Promise.all(albumPromises);
    const songs = await Promise.all(songPromises);
    return {
        albums,
        songs
    }
};