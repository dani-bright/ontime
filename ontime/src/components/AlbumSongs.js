import * as React from "react";
import {connect} from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import {getSong} from "../selectors/song/getSong";
import {setNowPlaying} from "../action-creator/setNowPlaying";
import {getSongAuthor} from "../selectors/song/getSongAuthor";
import "../styles/Player.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileAudio} from "@fortawesome/free-solid-svg-icons";
import {getAudioPlayer} from "../selectors/audio/getAudioPlayer";
import {isNowPlaying} from "../selectors/audio/IsNowPlaying";
import {getAlbum} from "../selectors/album/getAlbum";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";
import {getPlaylistIndex} from "../selectors/audio/getPlaylistIndex";
import {setPlaylistIndex} from "../action-creator/playlist/setPlaylistIndex";
import {getPlaylist} from "../selectors/audio/getPlaylist";

export class AlbumSongs extends React.PureComponent {
    state = {
        isPlaying: false,
        audio: null,
        duration: "00:00",
        currentTime: "00:00",
        percentage: 0,
        songsIndex: 0,
    };

    componentDidMount() {
        this.setState({
            audio: this.refs.audio2.audioEl
        })
    }

    getDuration = () => {
        const {audio} = this.state;
        const minutes = audio ? Math.floor(audio.duration / 60) : '00';
        const seconds = audio ? audio.duration - minutes * 60 : '00';
        this.setState({
            duration: `${minutes}:${seconds.toFixed(0)}`
        })
    };

    setNowPlaying = () => {
        const {audioPlayer} = this.props;
        this.props.setNowPlaying(this.props.song);
        this.props.setPlaylist(this.props.album.songs);

        this.setState({isPlaying: true}, () => {
            audioPlayer.play();
            const actualSongIndex = this.props.playlist.findIndex(song => song.id === this.props.song.id);
            this.props.setPlaylistIndex(actualSongIndex);
        })
    };

    render() {
        const {song, authors, isNowPlaying} = this.props;
        const {duration} = this.state;

        const playIcon = isNowPlaying ? <FontAwesomeIcon icon={faFileAudio} onClick={this.togglePlay} size="2x"
                                                         style={{color: '#46d2e9'}}/>
            :
            <FontAwesomeIcon icon={faFileAudio} onClick={this.togglePlay} size="2x"
                             style={{color: 'grey'}}/>;
        return (
            <div className="albumSong" onClick={this.setNowPlaying}>
                <div className="albumSongDetail">
                    <div className="controls">
                        {playIcon}
                    </div>
                    <div><p className="author">{authors[0].name}</p>
                        <p className="title">{song.name}</p></div>

                </div>

                <div className="albumSongPlayer player">

                    <p className={"end"}>{duration}</p>
                    <ReactAudioPlayer ref="audio2"
                                      key={song.id}
                                      src={song.audio}
                                      onLoadedMetadata={this.getDuration}
                                      volume={0}
                    />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        playlistIndex: getPlaylistIndex(state),
        playlist: getPlaylist(state),
        album: getAlbum(state)(ownProps.idAlbum),
        isNowPlaying: isNowPlaying(state)(ownProps.idSong),
        song: getSong(state)(ownProps.idSong),
        authors: getSongAuthor(state)(ownProps.idSong),
        audioPlayer: getAudioPlayer(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (song) => dispatch(setNowPlaying(song)),
        setPlaylist: (songs) => dispatch(setPlaylist(songs)),
        setPlaylistIndex: (index) => dispatch(setPlaylistIndex(index)),
    }
};

export const SmartAlbumSongs = connect(mapStateToProps, mapDispatchToProps)(AlbumSongs);