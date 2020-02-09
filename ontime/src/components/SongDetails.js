import * as React from "react";
import {AuthenticationContext} from "../contexts/AuthentificationContext";
import {connect} from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import {getSong} from "../selectors/getSong";
import {setNowPlaying} from "../action-creator/setNowPlaying";
import {getSongAuthor} from "../selectors/getSongAuthor";
import "../styles/Player.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Filler} from "./Filler";
import {faPause, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {getAudioPlayer} from "../selectors/getAudioPlayer";
import {getNowPlaying} from "../selectors/getNowPlaying";

export class SongDetails extends React.PureComponent {
    static contextType = AuthenticationContext;
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

    togglePlay = () => {
        const {isPlaying, audio} = this.state;
        const {audioPlayer} = this.props;
        this.setState({
            isPlaying: !isPlaying
        }, () => {
            !isPlaying ? audio.play() : audio.pause();
            !isPlaying ? audioPlayer.play() : audioPlayer.pause();
        })
    };

    getDuration = () => {
        const {audio} = this.state;
        const minutes = audio ? Math.floor(audio.duration / 60) : '00';
        const seconds = audio ? audio.duration - minutes * 60 : '00';
        this.setState({
            duration: `${minutes}:${seconds.toFixed(0)}`
        })
    };

    getCurrentTime = async (e) => {
        const {audio} = this.state;
        const minutes = audio ? Math.floor(audio.currentTime / 60) : '00';
        const seconds = audio ? audio.currentTime - minutes * 60 : '00';
        this.setState(
            {
                percentage: ((audio.currentTime * 100) / audio.duration).toFixed(3),
                currentTime: `${minutes}:${seconds.toFixed(0)}`
            }
        );

    };

    setNowPlaying = () => {
        this.props.setNowPlaying(this.props.song)
    };

    render() {
        const {song, authors} = this.props;
        const {isPlaying, duration, currentTime, percentage} = this.state;

        const playPauseIcon = !isPlaying ? faPlayCircle : faPause;

        const displayImg = song.img ?
            <img className="picture" src={require(`../assets/pictures/${song.img}`)}/>
            : null
        return (
            <div className="detailContainer">
                <div className="songDetails">
                    {displayImg}
                    <div>
                        <p className="author">{authors[0].name}</p>
                        <p className="title">{song.name}</p>
                        <p className="detail">Added on {song.createdAt}</p>
                    </div>

                </div>

                <div className="subPlayer player">
                    <div className="controls">
                        <FontAwesomeIcon icon={playPauseIcon} onClick={this.togglePlay} size="2x"
                                         style={{color: '#46d2e9'}}/>
                    </div>

                    <div className="lectureBar">
                        <Filler percentage={percentage}/>
                        <p className="begin">{currentTime}</p><p className={"end"}>{duration}</p>
                    </div>
                    <ReactAudioPlayer ref="audio2"
                                      key={song.id}
                                      src={require(`../assets/songs/${song.audio}`)}
                                      onPlay={this.setNowPlaying}
                                      onLoadedMetadata={this.getDuration} onListen={this.getCurrentTime}
                                      listenInterval={1000}
                                      volume={0}
                    />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        song: getSong(state)(ownProps.idSong),
        authors: getSongAuthor(state)(ownProps.idSong),
        audioPlayer: getAudioPlayer(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (song) => {dispatch(setNowPlaying(song))}
    }
};

export const SmartSongDetail = connect(mapStateToProps, mapDispatchToProps)(SongDetails);