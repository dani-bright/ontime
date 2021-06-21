import * as React from "react";
import {connect} from "react-redux";
import {getUser} from "../selectors/user/getUser";
import "../styles/Form.css"
import {SmartSongForm} from "../components/form/SongForm";
import {SmartAlbumForm} from "../components/form/AlbumForm";
import {SmartAuthorForm} from "../components/form/AuthorForm";
import {isAdmin} from "../selectors/user/isAdmin";
import {getSongs} from "../selectors/song/getSongs";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";

export class Uploads extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formToDisplay: "songForm",
        };
        if (!this.props.isAdmin) {
            this.props.history.push('/');
        }
        this.props.setPlaylist(this.props.songs);
    }

    componentDidUpdate() {
        if (!this.props.isAdmin) {
            this.props.history.push('/');
        }
    }

    displaySongForm = () => {
        this.setState({
            formToDisplay: "songForm"
        })
    };

    displayAlbumForm = () => {
        this.setState({
            formToDisplay: "albumForm"
        })
    };

    displayAuthorForm = () => {
        this.setState({
            formToDisplay: "authorForm"
        })
    };


    render() {
        const {formToDisplay} = this.state;
        const songForm = formToDisplay === "songForm" ?
            <SmartSongForm/> : null;
        const albumForm = formToDisplay === "albumForm" ?
            <SmartAlbumForm/> : null;
        const authorForm = formToDisplay === "authorForm" ?
            <SmartAuthorForm/> : null;

        return (
            <div className="container">
                <div style={{marginTop: "34px"}}>
                    <button onClick={this.displaySongForm}>add Song</button>
                    <button onClick={this.displayAlbumForm}>add Album</button>
                    <button onClick={this.displayAuthorForm}>add Author</button>
                </div>

                {songForm}
                {albumForm}
                {authorForm}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songs: getSongs(state),
        isAdmin: isAdmin(state),
        user: getUser(state),
    }
};

const mapDispatchToProps = (dispatch) => ({
    setPlaylist: (songs) => dispatch(setPlaylist(songs))
});

export const SmartUploads = connect(mapStateToProps, mapDispatchToProps)(Uploads);