import * as React from 'react';
import Canvas from './Canvas';
import '../styles/Visualizer.css'
import {getNowPlaying} from "../selectors/audio/getNowPlaying";
import {getAudioPlayer} from "../selectors/audio/getAudioPlayer";
import {isAudioPlayerPlaying} from "../selectors/audio/isAudioPlayerPlaying";
import {connect} from "react-redux";
import '../styles/Visualizer.css'
import {getContext} from "../selectors/audio/getContext";

const Visualizer = (props) => {
    return <>
        {
            props.nowPlaying && props.audioPlayer && props.context ? (
                <div className="Visualizers">
                    <Canvas audioPlayer={props.audioPlayer} isPlaying={props.isPlaying} className="Visualizer leftV" context={props.context} nowPlaying={props.nowPlaying}/>
                    <Canvas audioPlayer={props.audioPlayer} isPlaying={props.isPlaying} className="Visualizer rightV" context={props.context} nowPlaying={props.nowPlaying}/>
                </div>

            ) : null
        }
    </>
};


const mapStateToProps = (state) => ({
    nowPlaying: getNowPlaying(state),
    audioPlayer: getAudioPlayer(state),
    isPlaying: isAudioPlayerPlaying(state),
    context: getContext(state),
});

export const SmartVisualizer = connect(mapStateToProps)(Visualizer);

