import * as React from "react";
import {SmartSongDetail} from "../components/SongDetails";

export default class Search extends React.PureComponent {
    state = {
        songs: []
    };

    componentDidMount() {
        if (!this.props.location.state) {
            //meaning you tried to access the page directly from the url
            this.props.history.push('/');
            return false;
        }
        const {songs} = this.props.location.state;
        this.props.location.state.songs && this.setState({songs})
    }

    componentDidUpdate() {
        const {songs} = this.props.location.state;
        songs && this.setState({songs})
    }

    render() {
        const {songs} = this.state;
        return (
            <div className="container">
                {
                    songs.length ? (
                        songs.map(song => <SmartSongDetail key={song.id} idSong={song.id}/>)
                    ) : (<p
                        style={{
                            color: 'black', position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%)', fontSize: '20px', textTransform: 'uppercase'
                        }}>No results</p>)
                }
            </div>
        )
    }
}