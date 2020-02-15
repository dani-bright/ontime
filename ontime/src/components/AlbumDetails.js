import * as React from "react";
import {connect} from "react-redux";
import "../styles/Player.css"
import {getAudioPlayer} from "../selectors/audio/getAudioPlayer";
import {getAlbum} from "../selectors/album/getAlbum";
import {getAlbumAuthor} from "../selectors/album/getAlbumAuthor";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOff, faToggleOn} from "@fortawesome/free-solid-svg-icons";
import {AlbumSongList} from "./AlbumSongList";

export class AlbumDetails extends React.PureComponent {

    state = {
        showSongs: false,
    };

    toggleShow = () => {
        this.setState({showSongs: !this.state.showSongs}, () => {
            this.state.showSongs && this.props.setPlaylist(this.props.album.songs);
        })
    };


    render() {
        const {album, author} = this.props;
        const {showSongs} = this.state;

        const authorName = author ? <p className="author">{author.name}</p> : null;

        const toggleShowIcon = showSongs ? faToggleOn : faToggleOff;

        const displayImg = album.img ?
            <img className="picture" src={album.img} alt="albumImg"/>
            : null
        return (
            <>
                {
                    album.songs.length ? (
                        <>
                            <div className="detailContainer album">
                                <FontAwesomeIcon icon={toggleShowIcon} onClick={this.toggleShow} size="lg"
                                                 style={{color: '#46d2e9'}} className="albumListToggler"/>
                                <div className="songDetails">
                                    {displayImg}
                                    <div>
                                        {authorName}
                                        <p className="title">{album.name}</p>
                                    </div>

                                </div>
                                <div>{album.songs.length} songs</div>

                            </div>
                            <AlbumSongList songs={album.songs} key={album.id + '54'} idAlbum={album.id}
                                           show={showSongs}/>
                        </>

                    ) : null
                }
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        album: getAlbum(state)(ownProps.idAlbum),
        author: getAlbumAuthor(state)(ownProps.idAlbum),
        audioPlayer: getAudioPlayer(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setPlaylist: (songs) => dispatch(setPlaylist(songs)),
    }
};

export const SmartAlbumDetail = connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);