import * as React from "react";
import "../../styles/SearchBar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";
import {getSongs} from "../../selectors/song/getSongs";
import {connect} from "react-redux";

class SearchBar extends React.PureComponent {
    state = {
        initialSongs: [],
        songs: [],
        searchBar: "",
    };

    redirect = (e) => {
        e.preventDefault();
        const {searchBar} = this.state;
        const songs = this.state.initialSongs;
        const filteredItems = songs.filter(item => item.name.toLowerCase().search(searchBar.toLowerCase()) !== -1 || item.authors[0].name.toLowerCase().search(searchBar.toLowerCase()) !== -1)
        this.setState({songs: filteredItems}, () => {
            this.props.history.push({
                pathname: "/search",
                state: {
                    songs: filteredItems
                }
            });
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    componentDidUpdate() {
        this.setState({
            initialSongs: this.props.songs,
            songs: this.props.songs
        })
    }


    render() {
        const {searchBar} = this.state;

        return (
            <>
                <form className="searchBar">
                    <input type="text" placeholder="Search for a song or an artist" id="searchBar"
                           onChange={this.handleChange}
                           value={searchBar}/>
                    <button onClick={this.redirect}>
                        <FontAwesomeIcon icon={faSearch} size="lg"/>
                    </button>
                </form>

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    songs: getSongs(state)
});

const SmartSearchBar = connect(mapStateToProps)(SearchBar)

export default withRouter(SmartSearchBar);