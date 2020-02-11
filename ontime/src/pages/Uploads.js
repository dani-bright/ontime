import * as React from "react";
import {connect} from "react-redux";
import {getUser} from "../selectors/getUser";
import "../styles/Form.css"
import {SmartSongForm} from "../components/form/SongForm";
import {SmartAlbumForm} from "../components/form/AlbumForm";
import {SmartAuthorForm} from "../components/form/AuthorForm";

export class Uploads extends React.PureComponent {
    state = {
        formToDisplay: "songForm",
    };

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
                <h2>upload page</h2>
                <button onClick={this.displaySongForm}>add Song</button>
                <button onClick={this.displayAlbumForm}>add Album</button>
                <button onClick={this.displayAuthorForm}>add Author</button>
                {songForm}
                {albumForm}
                {authorForm}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: getUser(state),
    }
};

export const SmartUploads = connect(mapStateToProps)(Uploads);