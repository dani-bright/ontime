import * as React from "react";
import "../styles/Player.css"
import {getNowPlaying} from "../selectors/getNowPlaying";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Filler} from './Filler'
import {faBackward, faForward, faHeart, faHeartbeat, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from "react-audio-player";
import {getSongs} from "../selectors/getSongs";
import {connect} from "react-redux";
import SongService from "../services/SongService";
import {setNowPlaying} from "../action-creator/setNowPlaying";
import {setAudioPlayer} from "../action-creator/setAudioPlayer";
import {getUser} from "../selectors/getUser";
import FavoriteService from "../services/FavoriteService";

class MainPlayer extends React.PureComponent {
    state = {
        isFavorite: false,
        isPlaying: false,
        audio: null,
        duration: "00:00",
        currentTime: "00:00",
        percentage: 0,
        songsIndex: 0,
    };

    async componentDidUpdate() {
        this.setState({
            audio: this.refs.audio.audioEl
        });
        this.props.setAudioPlayer(this.refs.audio.audioEl);

        //no favorite if there is no user
        if (this.props.user) {
            await this.checkFavorite() ? this.setState({isFavorite: true}) : this.setState({isFavorite: false})
        }

    }

    checkFavorite = async () => {
        const getResponse = await FavoriteService.findOne(this.props.user.id, this.props.nowPlaying.id);
        const favoriteData = await getResponse.json();
        return favoriteData.favorites
    };

    togglePlay = () => {
        const {isPlaying, audio} = this.state;
        this.setState({
            isPlaying: !isPlaying
        }, () => {
            !isPlaying ? audio.play() : audio.pause();
        })
    };

    toggleFavorite = async () => {
        const body = {
            songId: this.props.nowPlaying.id,
            userId: this.props.user.id,
        };
        const favorite = await this.checkFavorite();
        if (favorite) {
            await FavoriteService.remove(favorite.id);
            this.setState({isFavorite: false})

        } else {
            await FavoriteService.create(body)
            this.setState({isFavorite: true})
        }

    };

    play = () => {
        const {audio} = this.state;
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
        }, () => {
            audio.pause();
            audio.load();
            audio.play();
        });
        this.props.setNowPlaying(this.props.songs[songsIndex + 1]);

    };
    prev = () => {
        const {audio, songsIndex} = this.state;

        this.setState({
            songsIndex: songsIndex - 1,
        }, () => {
            audio.pause();
            audio.load();
            audio.play();
        });
        this.props.setNowPlaying(this.props.songs[songsIndex - 1]);


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
        const {songsIndex, isFavorite, isPlaying, duration, currentTime, percentage} = this.state;
        const {nowPlaying, user} = this.props;
        const playPauseIcon = !isPlaying ? faPlay : faPause;
        const favoriteIcon = !isFavorite ? faHeartbeat : faHeart;

        const displayNext = this.props.songs.length !== songsIndex + 1 ?
            <FontAwesomeIcon icon={faForward} onClick={this.next} size="2x" style={{color: 'white'}}/> :
            <FontAwesomeIcon icon={faForward} size="2x" style={{color: '#141415'}}/>;
        const displayPrev = songsIndex === 0 ? <FontAwesomeIcon icon={faBackward} size="2x" style={{color: '#141415'}}/>
            : <FontAwesomeIcon icon={faBackward} onClick={this.prev} size="2x" style={{color: 'white'}}/>;
        const displayImg = nowPlaying.img ?
            <img className="picture" src={require(`../assets/pictures/${nowPlaying.img}`)}/>
            : null;

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
                {
                    user ? (
                        <FontAwesomeIcon icon={favoriteIcon} size="lg" style={{color: '#46d2e9'}}
                                         onClick={this.toggleFavorite}/>

                    ) : null
                }

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
    return {
        user: getUser(state),
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