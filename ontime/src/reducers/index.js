import {combineReducers} from 'redux'
import user from "./user";
import songs from "./songs";
import albums from "./albums";
import nowPlaying from "./nowPlaying";
import categories from "./categories";
import selectedCategory from "./selectedCategory";
import audioPlayer from "./audioPlayer";
import authors from "./authors";

export default combineReducers({
    user, songs, albums, nowPlaying, categories, selectedCategory, audioPlayer, authors
})