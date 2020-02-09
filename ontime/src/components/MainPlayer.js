import * as React from "react";
import "../styles/Player.css"
import {getNowPlaying} from "../selectors/getNowPlaying";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Filler} from './Filler'
import {faBackward, faForward, faHeart, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from "react-audio-player";
import {getSongs} from "../selectors/getSongs";
import {connect} from "react-redux";
import SongService from "../services/SongService";
import {setNowPlaying} from "../action-creator/setNowPlaying";
import {setAudioPlayer} from "../action-creator/setAudioPlayer";

class MainPlayer extends React.PureComponent {
    state = {
        nowPlaying: this.props.songs[0],
        isPlaying: false,
        audio: null,
        duration: "00:00",
        currentTime: "00:00",
        percentage: 0,
        songsIndex: 0,
    };

    componentDidMount() {
        this.setState({
            audio: this.refs.audio.audioEl
        });
        this.props.setAudioPlayer(this.refs.audio.audioEl)
    }

    togglePlay = () => {
        const {isPlaying, audio} = this.state;
        this.setState({
            isPlaying: !isPlaying
        }, () => {
            !isPlaying ? audio.play() : audio.pause();
        })
    };

    play = () => {
        const {isPlaying, audio} = this.state;
        this.setState({
            isPlaying: true
        }, () => {
            audio.play();
        });
        this.props.setNowPlaying(this.props.nowPlaying)
    };

    stop = () => {
        const {audio} = this.state;
        this.setState({
            isPlaying: false
        }, () => {
            audio.pause();
        })
    };

    next = () => {
        const {audio, songsIndex} = this.state;
        this.setState({
            songsIndex: songsIndex + 1,
            nowPlaying: this.props[songsIndex + 1]
        }, () => {
            audio.pause();
            audio.load();
            audio.play();
        });

    };
    prev = () => {
        const {audio, songsIndex} = this.state;

        this.setState({
            songsIndex: songsIndex - 1,
            nowPlaying: this.props[songsIndex - 1]
        }, () => {
            audio.pause();
            audio.load();
            audio.play();
        });

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
        const {audio, percentage, duration} = this.state;
        const minutes = audio ? Math.floor(audio.currentTime / 60) : '00';
        const seconds = audio ? audio.currentTime - minutes * 60 : '00';
        this.setState(
            {
                percentage: ((audio.currentTime * 100) / audio.duration).toFixed(3),
                currentTime: `${minutes}:${seconds.toFixed(0)}`
            }
        );

        if (audio.currentTime.toFixed(0) == 25) {
            let {nowPlaying} = this.state;
            let song = await SongService.findOne(nowPlaying.id);
            const data = await song.json();
            let body = {
                listened: data.song.listened + 1,
            };
            await SongService.update(nowPlaying.id, body);
        }
    };


    render() {
        const {songsIndex, isPlaying, duration, currentTime, percentage} = this.state;
        const {nowPlaying} = this.props;
        const playPauseIcon = !isPlaying ? faPlay : faPause;

        const displayNext = this.props.songs.length !== songsIndex + 1 ?
            <FontAwesomeIcon icon={faForward} onClick={this.next} size="2x" style={{color: 'white'}}/> :
            <FontAwesomeIcon icon={faForward} size="2x" style={{color: '#141415'}}/>;
        const displayPrev = songsIndex === 0 ? <FontAwesomeIcon icon={faBackward} size="2x" style={{color: '#141415'}}/>
            : <FontAwesomeIcon icon={faBackward} onClick={this.prev} size="2x" style={{color: 'white'}}/>;
        const displayImg = nowPlaying.img ?
            <img className="picture" src={require(`../assets/pictures/${nowPlaying.img}`)}/>
            : null
        console.log(nowPlaying, nowPlaying.audio)


        return (
            <div className="mainPlayer player">
                <div className="controls">
                    {displayPrev}
                    <FontAwesomeIcon icon={playPauseIcon} onClick={this.togglePlay} size="2x" style={{color: 'white'}}/>
                    {displayNext}
                </div>
                {displayImg}
                <div className="songDetails">
                    {/*<p className="author">{nowPlaying.authors[0].name}</p>*/}
                    <p className="title">{nowPlaying.name}</p>
                </div>
                <div className="lectureBar">
                    <Filler percentage={percentage}/>
                    <p className="begin">{currentTime}</p><p className={"end"}>{duration}</p>
                </div>
                <FontAwesomeIcon icon={faHeart} size="lg" style={{color: '#46d2e9'}}/>

                <ReactAudioPlayer
                    ref="audio"
                    src={require(`../assets/songs/${nowPlaying.audio}`)}
                    onPlay={this.play}
                    onPause={this.stop}
                    onLoadedMetadata={this.getDuration} onListen={this.getCurrentTime} listenInterval={1000}/>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(getNowPlaying(state))
    return {
        nowPlaying: getNowPlaying(state),
        songs: getSongs(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (song) => dispatch(setNowPlaying(song)),
        setAudioPlayer: (audioTag) => dispatch(setAudioPlayer(audioTag))
    }

};


export const SmartMainPlayer = connect(mapStateToProps, mapDispatchToProps)(MainPlayer);