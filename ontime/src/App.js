import * as React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {SmartHome} from "./pages/Home";
import {SmartHeader} from "./components/Header";
import "./styles/Page.css";
import {PopupProvider} from "./contexts/PopupContext";
import {MenuProvider} from "./contexts/MenuContext";
import SongService from "./services/SongService";
import {connect} from "react-redux";
import {setSongs} from "./action-creator/songs/setSongs";
import AlbumService from "./services/AlbumService";
import {setAlbums} from "./action-creator/albums/setAlbums";
import {SmartAlbums} from "./pages/Albums";
import {SmartSongs} from "./pages/Songs";
import {SmartMainPlayer} from "./components/MainPlayer";
import CategoryService from "./services/CategoryService";
import {setCategories} from "./action-creator/categories/setCategories";
import {SmartTrending} from "./pages/Trending";
import {SmartFavorites} from "./pages/Favorites";
import {SmartUploads} from "./pages/Uploads";
import {setNowPlaying} from "./action-creator/setNowPlaying";
import {setAuthors} from "./action-creator/authors/setAuthors";
import AuthorService from "./services/AuthorService";
import './styles/Button.css'
import {setPlaylist} from "./action-creator/playlist/setPlaylist";
import {SmartAdmin} from "./pages/Admin";
import Search, {SmartSearch} from "./pages/Search";
import {SmartVisualizer} from "./components/Visualizer";

class App extends React.PureComponent {
    async componentDidMount() {
        const songs = await SongService.findAll();
        const dataSongs = await songs.json();
        this.props.setSongs(dataSongs.songs);
        dataSongs.songs.length && this.props.setNowPlaying(dataSongs.songs[0]);
        dataSongs.songs.length && this.props.setPlaylist(dataSongs.songs);

        const albums = await AlbumService.findAll();
        const dataAlbums = await albums.json();
        this.props.setAlbums(dataAlbums.albums);

        const categories = await CategoryService.findAll();
        const dataCategories = await categories.json();
        this.props.setCategories(dataCategories.categories);

        const authors = await AuthorService.findAll();
        const dataAuthors = await authors.json();
        this.props.setAuthors(dataAuthors.authors);

    }

    render() {
        return (
            <PopupProvider>
                <BrowserRouter>
                    <MenuProvider>
                        <SmartHeader/>
                        <Route exact path="/" component={SmartHome}/>
                        <Route path="/search" component={SmartSearch}/>
                        <Route path="/albums" component={SmartAlbums}/>
                        <Route path="/songs" component={SmartSongs}/>
                        <Route path="/trending" component={SmartTrending}/>
                        <Route path="/favorites" component={SmartFavorites}/>
                        <Route path="/uploads" component={SmartUploads}/>
                        <Route path="/admin" component={SmartAdmin}/>
                        <SmartVisualizer/>
                        <SmartMainPlayer/>
                    </MenuProvider>
                </BrowserRouter>
            </PopupProvider>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (song) => dispatch(setNowPlaying(song)),
        setPlaylist: (songs) => dispatch(setPlaylist(songs)),
        setAuthors: (authors) => dispatch(setAuthors(authors)),
        setSongs: (songs) => dispatch(setSongs(songs)),
        setAlbums: (albums) => dispatch(setAlbums(albums)),
        setCategories: (categories) => dispatch(setCategories(categories)),
    }
};

export const SmartApp = connect(undefined, mapDispatchToProps)(App);

export default App;
