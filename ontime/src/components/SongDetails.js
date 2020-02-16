import * as React from "react";
import {connect} from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import {getSong} from "../selectors/song/getSong";
import {setNowPlaying} from "../action-creator/setNowPlaying";
import {getSongAuthor} from "../selectors/song/getSongAuthor";
import "../styles/Player.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Filler} from "./Filler";
import {faHeadphones, faPause, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {getAudioPlayer} from "../selectors/audio/getAudioPlayer";
import {isAudioPlayerPlaying} from "../selectors/audio/isAudioPlayerPlaying";
import {isNowPlaying} from "../selectors/audio/IsNowPlaying";
import {getNowPlaying} from "../selectors/audio/getNowPlaying";
import {setPlaylistIndex} from "../action-creator/playlist/setPlaylistIndex";
import {getCurrentTime} from "../selectors/audio/getCurrentTime";
import {getPlaylist} from "../selectors/audio/getPlaylist";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";
import {getSongs} from "../selectors/song/getSongs";

export class SongDetails extends React.PureComponent {
    //prevent memory leak
    _isMounted = false;

    state = {
        isPlaying: false,
        audio: null,
        duration: "00:00",
        currentTime: "00:00",
        percentage: 0,
        songsIndex: 0,
    };

    componentDidMount() {
        this._isMounted = true;
        this.props.setPlaylist(this.props.songs);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate() {
        this._isMounted && this.props.isNowPlaying ?
            this.setState({
                audio: this.refs.audio2.audioEl,
                isPlaying: true,
            }, () => {
                setInterval(() => {
                    this.getCurrentTime();
                }, 1000);
            }) : this.setState({
                audio: this.refs.audio2.audioEl,
                isPlaying: false,
                percentage: 0,
                currentTime: '00:00'
            });
    }

    getDuration = (e) => {
        const audio = e.target;
        const minutes = audio ? Math.floor(audio.duration / 60) : 0;
        const seconds = audio ? audio.duration - minutes * 60 : 0;
        this._isMounted && this.setState({
            duration: `${minutes}:${seconds.toFixed(0)}`
        })
    };

    getCurrentTime = () => {
        const {audio} = this.state;
        const {audioPlayerCurrentTime} = this.props;
        const minutes = audio ? Math.floor(audioPlayerCurrentTime / 60) : '00';
        const seconds = audio ? audioPlayerCurrentTime - minutes * 60 : '00';
        if (this.props.isNowPlaying && this._isMounted) {
            this.setState(
                {
                    percentage: ((audioPlayerCurrentTime * 100) / audio.duration).toFixed(3),
                    currentTime: `${minutes}:${seconds.toFixed(0)}`
                }
            );
        }


    };

    setNowPlaying = () => {
        const {audioPlayer} = this.props;
        const {isPlaying} = this.state;
        this.props.setNowPlaying(this.props.song);

        this._isMounted && this.setState({isPlaying: true}, () => {
            if ((!isPlaying && this._isMounted) || (this.props.isNowPlaying && isPlaying)) {
                audioPlayer.play();
                const actualSongIndex = this.props.playlist.findIndex(song => song.id === this.props.song.id);
                //setting the mainPlayer progress bar with the actual song progressBar
                setInterval(() => {
                    this.getCurrentTime();
                }, 1000);
                this.props.setPlaylistIndex(actualSongIndex);
            } else {
                audioPlayer.pause()
            }

        })
    };


    render() {
        const {song, authors} = this.props;
        const {isPlaying, duration, currentTime, percentage} = this.state;

        const playPauseIcon = isPlaying ? faPause : faPlayCircle;

        const displayImg = song.img ?
            <div className="imgContainer" style={{background: `url(${song.img}) center center`}}></div>
            : <div className="imgContainer"></div>

        return (
            <div className="detailContainer">
                <div className="listened">
                    <p>{song.listened}</p>
                    <FontAwesomeIcon icon={faHeadphones} size="lg" style={{color: '#46d2e9'}}/>
                </div>
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
                        <FontAwesomeIcon icon={playPauseIcon} onClick={this.setNowPlaying} size="2x"
                                         style={{color: '#46d2e9'}}/>
                    </div>

                    <div className="lectureBar">
                        <Filler percentage={percentage}/>
                        <p className="begin">{currentTime}</p><p className={"end"}>{duration}</p>
                    </div>
                    <ReactAudioPlayer ref="audio2"
                                      key={song.id}
                                      src={song.audio}
                                      onLoadedMetadata={this.getDuration}
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
        audioPlayerCurrentTime: getCurrentTime(state),
        songs: getSongs(state),
        playlist: getPlaylist(state),
        nowPlaying: getNowPlaying(state),
        isNowPlaying: isNowPlaying(state)(ownProps.idSong),
        isAudioPlayerPlaying: isAudioPlayerPlaying(state),
        song: getSong(state)(ownProps.idSong),
        authors: getSongAuthor(state)(ownProps.idSong),
        audioPlayer: getAudioPlayer(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (song) => dispatch(setNowPlaying(song)),
        setPlaylistIndex: (song) => dispatch(setPlaylistIndex(song)),
        setPlaylist: (songs) => dispatch(setPlaylist(songs)),
    }
};

export const SmartSongDetail = connect(mapStateToProps, mapDispatchToProps)(SongDetails);