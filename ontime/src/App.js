import * as React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {SmartHome} from "./pages/Home";
import Header from "./components/Header";
import "./styles/Page.css";
import {PopupProvider} from "./contexts/PopupContext";
import {MenuProvider} from "./contexts/MenuContext";
import {AuthenticationProvider} from "./contexts/AuthentificationContext";
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

class App extends React.PureComponent {
    async componentDidMount() {
        const songs = await SongService.findAll();
        if (songs.ok) {
            let data = await songs.json();
            this.props.setSongs(data.songs);
        }

        const albums = await AlbumService.findAll();
        if (albums.ok) {
            let data = await albums.json();
            this.props.setAlbums(data.albums);
        }

        const categories = await CategoryService.findAll();
        if (categories.ok) {
            let data = await categories.json();
            this.props.setCategories(data.categories);
        }

    }

    render() {
        return (
            <AuthenticationProvider>
                <PopupProvider>
                    <BrowserRouter>
                        <MenuProvider>
                            <Header/>
                            <Route exact path="/" component={SmartHome}/>
                            <Route exact path="/albums" component={SmartAlbums}/>
                            <Route exact path="/songs" component={SmartSongs}/>
                            <Route exact path="/trending" component={SmartTrending}/>
                            <SmartMainPlayer/>
                        </MenuProvider>
                    </BrowserRouter>
                </PopupProvider>
            </AuthenticationProvider>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSongs: (songs) => dispatch(setSongs(songs)),
        setAlbums: (albums) => dispatch(setAlbums(albums)),
        setCategories: (categories) => dispatch(setCategories(categories)),
    }
};

export const SmartApp = connect(undefined, mapDispatchToProps)(App);

export default App;
