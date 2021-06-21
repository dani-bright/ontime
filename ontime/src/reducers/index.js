import {combineReducers} from 'redux'
import user from "./user";
import songs from "./songs";
import albums from "./albums";
import nowPlaying from "./nowPlaying";
import categories from "./categories";
import selectedCategory from "./selectedCategory";
import audioPlayer from "./audioPlayer";
import authors from "./authors";
import playlist from "./playlist";
import users from "./users";

export default combineReducers({
    users, user, playlist, songs, albums, nowPlaying, categories, selectedCategory, audioPlayer, authors
})