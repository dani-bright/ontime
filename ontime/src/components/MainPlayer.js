import * as React from "react";
import "../styles/Player.css"
import {getNowPlaying} from "../selectors/audio/getNowPlaying";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Filler} from './Filler'
import {faBackward, faForward, faHeart, faHeartbeat, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from "react-audio-player";
import {connect} from "react-redux";
import SongService from "../services/SongService";
import {setNowPlaying} from "../action-creator/setNowPlaying";
import {setAudioPlayer} from "../action-creator/audioPlayer/setAudioPlayer";
import {getUser} from "../selectors/user/getUser";
import FavoriteServiceInstance from "../services/FavoriteService";
import {setUser} from "../action-creator/users/user/setUser";
import {getUserFavorites} from "../selectors/user/getUserFavorites";
import {getAudioPlayer} from "../selectors/audio/getAudioPlayer";
import {getPlaylist} from "../selectors/audio/getPlaylist";
import {getPlaylistIndex} from "../selectors/audio/getPlaylistIndex";
import {setPlaylistIndex} from "../action-creator/playlist/setPlaylistIndex";
import {setIsPlaying} from "../action-creator/audioPlayer/setIsPlaying";
import {setCurrentTime} from "../action-creator/audioPlayer/setCurrentTime";

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


    async componentDidUpdate(prevProps, prevState) {
        this.setState({
            audio: this.refs.audio.audioEl
        });

        if (!this.props.audioPlayer) {
            this.props.setAudioPlayer(this.refs.audio.audioEl);
        }

        //no favorite if there is no user
        if (this.props.user && prevProps.nowPlaying !== this.props.nowPlaying) {
            await this.checkFavorite() ? this.setState({isFavorite: true}) : this.setState({isFavorite: false})
        } else if (this.props.user && !this.state.isPlaying && this.props.nowPlaying) {
            await this.checkFavorite() ? this.setState({isFavorite: true}) : this.setState({isFavorite: false})
        }

    }

    checkFavorite = async () => {
        const getResponse = await FavoriteServiceInstance.findOne(this.props.user.id, this.props.nowPlaying.id);
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
            await FavoriteServiceInstance.remove(favorite.id);
            const toRemove = this.props.favorites.findIndex(fav => fav.songId === favorite.songId);

            this.props.favorites.splice(toRemove, 1)

            this.setState({isFavorite: false});
            this.props.setUser({
                user: {
                    ...this.props.user
                },
                favorites: this.props.favorites
            })

        } else {
            const newFavoriteResponse = await FavoriteServiceInstance.create(body);
            const data = await newFavoriteResponse.json();
            this.setState({isFavorite: true})
            //refresh favorites page when adding favorite
            this.props.setUser({
                user: {
                    ...this.props.user
                },
                favorites: [data.favorite, ...this.props.favorites]
            })
        }

    };

    play = () => {
        const {audio} = this.state;
        this.setState({
            isPlaying: true
        }, () => {
            audio.play();
            this.props.setIsPlaying(true);
        });
        this.props.setNowPlaying(this.props.nowPlaying)
    };

    stop = () => {
        const {audio} = this.state;
        this.setState({
            isPlaying: false
        }, () => {
            audio.pause();
            this.props.setIsPlaying(false);
        })
    };

    next = () => {
        const {audio, songsIndex} = this.state;
        const actualSongIndex = this.props.playlist.findIndex(song => song.id === this.props.nowPlaying.id) + 1;
        this.props.playlist.length !== actualSongIndex && this.props.setNowPlaying(this.props.playlist[actualSongIndex]);

        // +1 because now playing hasn't change yet
        this.props.setPlaylistIndex(actualSongIndex);
        this.setState({
            songsIndex: songsIndex + 1,
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
        }, () => {
            audio.pause();
            audio.load();
            audio.play();
        });
        const actualSongIndex = this.props.playlist.findIndex(song => song.id === this.props.nowPlaying.id) - 1;
        actualSongIndex === 0 ? this.props.setNowPlaying(this.props.playlist[0]) : this.props.setNowPlaying(this.props.playlist[actualSongIndex]);

        // -1 because now playing hasn't change yet
        this.props.setPlaylistIndex(actualSongIndex);
    };

    getDuration = (e) => {
        const audio = e.target;
        const minutes = audio ? Math.floor(audio.duration / 60) : 0;
        const seconds = audio ? audio.duration - minutes * 60 : 0;
        this.setState({
            duration: `${minutes}:${seconds.toFixed(0)}`
        })
    };

    getCurrentTime = async (e) => {
        const {audio} = this.state;
        const minutes = audio ? Math.floor(audio.currentTime / 60) : '00';
        const seconds = audio ? audio.currentTime - minutes * 60 : '00';
        this.props.setCurrentTime(audio.currentTime);
        this.setState(
            {
                percentage: ((audio.currentTime * 100) / audio.duration).toFixed(3),
                currentTime: `${minutes}:${seconds.toFixed(0)}`
            }
        );

        if (parseFloat(audio.currentTime.toFixed(0)) === 25) {
            const {nowPlaying} = this.props;
            const song = await SongService.findOne(nowPlaying.id);
            const data = await song.json();
            const body = {
                listened: data.song.listened + 1,
            };
            await SongService.update(nowPlaying.id, body);
        }
    };


    render() {
        const {isFavorite, isPlaying, duration, currentTime, percentage} = this.state;
        const {nowPlaying, user, playlistIndex} = this.props;
        const playPauseIcon = !isPlaying ? faPlay : faPause;
        const favoriteIcon = !isFavorite ? faHeartbeat : faHeart;

        const displayNext = this.props.playlist.length !== playlistIndex + 1 ?
            <FontAwesomeIcon icon={faForward} onClick={this.next} size="2x" style={{color: 'white'}}/> :
            <FontAwesomeIcon icon={faForward} size="2x" style={{color: '#141415'}}/>;
        const displayPrev = playlistIndex === 0 ?
            <FontAwesomeIcon icon={faBackward} size="2x" style={{color: '#141415'}}/>
            : <FontAwesomeIcon icon={faBackward} onClick={this.prev} size="2x" style={{color: 'white'}}/>;
        const displayImg = nowPlaying && nowPlaying.img ?
            <img className="picture" src={nowPlaying.img} alt="songImg"/>
            : null;
        const displayInfo = nowPlaying ? <div className="songDetails">
            <p className="author">{nowPlaying.authors[0].name}</p>
            <p className="title">{nowPlaying.name}</p>
        </div> : null;

        return (
            <div className="mainPlayer player">
                <div className="controls">
                    {displayPrev}
                    <FontAwesomeIcon icon={playPauseIcon} onClick={this.togglePlay} size="2x" style={{color: 'white'}}/>
                    {displayNext}
                </div>
                {displayImg}
                {displayInfo}

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
                {
                    nowPlaying ? (
                        <ReactAudioPlayer
                            ref="audio"
                            src={nowPlaying.audio}
                            title="song"
                            onPlay={this.play}
                            onPause={this.stop}
                            onEnded={this.next}
                            onLoadedMetadata={this.getDuration} onListen={this.getCurrentTime} listenInterval={1000}/>
                    ) : (<ReactAudioPlayer
                        ref="audio"/>)
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playlistIndex: getPlaylistIndex(state),
        audioPlayer: getAudioPlayer(state),
        user: getUser(state),
        favorites: getUserFavorites(state),
        nowPlaying: getNowPlaying(state),
        playlist: getPlaylist(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (song) => dispatch(setNowPlaying(song)),
        setCurrentTime: (currentTime) => dispatch(setCurrentTime(currentTime)),
        setPlaylistIndex: (index) => dispatch(setPlaylistIndex(index)),
        setAudioPlayer: (audioTag) => dispatch(setAudioPlayer(audioTag)),
        setUser: (user) => dispatch(setUser(user)),
        setIsPlaying: (isPlaying) => dispatch(setIsPlaying(isPlaying)),
    }

};


export const SmartMainPlayer = connect(mapStateToProps, mapDispatchToProps)(MainPlayer);