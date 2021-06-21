import * as React from "react";
import {SmartSongDetail} from "../components/SongDetails";
import {getSongs} from "../selectors/song/getSongs";
import {connect} from "react-redux";
import {SongList} from "../components/SongList";

export default class Search extends React.PureComponent {
    state = {
        query: ""
    };

    componentDidMount() {
        if (!this.props.location.state) {
            //meaning you tried to access the page directly from the url
            this.props.history.push('/');
            return false;
        }
        const {query} = this.props.location.state;
        this.props.location.state.query && this.setState({query})
    }

    componentDidUpdate() {
        const {query} = this.props.location.state;
        query && this.setState({query})
    }

    render() {
        const {songs} = this.props;
        const {query} = this.state;
        const filteredSongs = songs.filter(item => item.name.toLowerCase().search(query.toLowerCase()) !== -1 || item.authors[0].name.toLowerCase().search(query.toLowerCase()) !== -1)
        return (
            <div className="container">
                {
                    filteredSongs.length ? (
                        <SongList songs={filteredSongs}/>
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

const mapStateToProps = (state) => ({
    songs: getSongs(state)
});

export const SmartSearch = connect(mapStateToProps)(Search);