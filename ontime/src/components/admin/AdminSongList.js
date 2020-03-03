import * as React from "react";
import {connect} from "react-redux";
import {PopupContext} from "../../contexts/PopupContext";
import {setSongs} from "../../action-creator/songs/setSongs";
import {getSongs} from "../../selectors/song/getSongs";
import SongService from "../../services/SongService";
import {SmartSongForm} from "../form/SongForm";
import {SmartAdminSong} from "./AdminSong";
import FavoriteServiceInstance from "../../services/FavoriteService";
import AlbumService from "../../services/AlbumService";
import {setAlbums} from "../../action-creator/albums/setAlbums";
import {getUser} from "../../selectors/user/getUser";
import {setUser} from "../../action-creator/users/user/setUser";

export default class AdminSongList extends React.Component {
    static contextType = PopupContext;

    state = {
        showLoader: false,
    };

    deleteSong = async (id) => {
        this.setState({showLoader: true});
        const response = await SongService.remove(id);
        if (response.ok) {
            const songs = await SongService.findAll();
            const dataSongs = await songs.json();
            this.setState({showLoader: false});
            this.props.setSongs(dataSongs.songs);
            const albums = await AlbumService.findAll();
            const dataAlbums = await albums.json();
            this.props.setAlbums(dataAlbums.albums);

            const isFavorite = await FavoriteServiceInstance.findOne(this.props.user.id, id);
            const favorite = await isFavorite.json();
            if (favorite) {
                await FavoriteServiceInstance.remove(favorite.id);
                const toRemove = this.props.favorites.findIndex(fav => fav.songId === id);
                this.props.favorites.splice(toRemove, 1)

                this.props.setUser({
                    user: {
                        ...this.props.user
                    },
                    favorites: this.props.favorites
                });
            }
        }
    };

    editSong = async (id) => {
        this.context.popup.show("Song edition",
            <SmartSongForm songId={id}/>)
    };

    render() {
        return (
            <table className="table">
                <img src={require("../../assets/images/loader.gif")}
                     className={`loader ${this.state.showLoader && 'active'}`} alt="loader"/>
                <thead>
                <tr>
                    <th>#</th>
                    <th>image</th>
                    <th>name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.songs.map(song => {
                        return (
                            <SmartAdminSong key={song.id} song={song} delete={() => {
                                this.deleteSong(song.id)
                            }} edit={() => {
                                this.editSong(song.id)
                            }}/>
                        );
                    })

                }

                </tbody>
            </table>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        songs: getSongs(state),
        user: getUser(state),
        favorites: state.user.favorites
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSongs: (songs) => dispatch(setSongs(songs)),
        setAlbums: (albums) => dispatch(setAlbums(albums)),
        setUser: (user) => dispatch(setUser(user)),
    }
};

export const SmartAdminSongList = connect(mapStateToProps, mapDispatchToProps)(AdminSongList)