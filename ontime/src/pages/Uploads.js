import * as React from "react";
import {connect} from "react-redux";
import {getUser} from "../selectors/getUser";
import "../styles/Form.css"
import {getAlbums} from "../selectors/getAlbums";
import {getAuthors} from "../selectors/getAuthors";
import {getCategories} from "../selectors/getCategories";
import {SongForm} from "../components/form/SongForm";
import {AlbumForm} from "../components/form/AlbumForm";
import {AuthorForm} from "../components/form/AuthorForm";

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
        const {albums, authors, categories} = this.props;
        const songForm = formToDisplay === "songForm" ?
            <SongForm albums={albums} authors={authors} categories={categories}/> : null;
        const albumForm = formToDisplay === "albumForm" ?
            <AlbumForm authors={authors} categories={categories}/> : null;

        const authorForm = formToDisplay === "authorForm" ?
            <AuthorForm/> : null;

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
        albums: getAlbums(state),
        authors: getAuthors(state),
        categories: getCategories(state),
    }
};

export const SmartUploads = connect(mapStateToProps)(Uploads);