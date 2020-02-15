import * as React from "react";
import {connect} from "react-redux";
import SongService from "../../services/SongService";
import {setSongs} from "../../action-creator/songs/setSongs";
import {getAlbums} from "../../selectors/album/getAlbums";
import {getAuthors} from "../../selectors/getAuthors";
import {getCategories} from "../../selectors/category/getCategories";

export class SongForm extends React.PureComponent {
    state = {
        img: null,
        audio: null,
        categoryId: "",
        albumId: "",
        authorId: "",
        name: "",
        error: "",
        errorColor: "error",
    };

    onPhotoSelected = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.setState({img: event.target.result})
            };
            reader.readAsDataURL(file);
        }

    };
    onAudioSelected = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({audio: event.target.result})
        };
        reader.readAsDataURL(file);
    };


    submit = async (e) => {
        e.preventDefault();
        const response = await SongService.create(this.state);
        const data = await response.json();
        //if adding song doesnt work check your mysql configuration file and set to max_allowed_packet 20M it should be enough
        if (response.ok) {
            const songs = await SongService.findAll();
            const dataSongs = await songs.json();
            this.props.setSongs(dataSongs.songs);
            this.setState({
                error: "song added to database",
                img: null,
                audio: null,
                categoryId: "",
                albumId: "",
                authorId: "",
                name: "",
                errorColor: "success",
            });

        } else {
            this.setState({error: data.message, errorColor: "error"})
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        const {img, error, name, errorColor} = this.state;
        const {albums, authors, categories} = this.props;
        const image = img ? <img src={img} alt="" width={60}/> : null;
        const errorMsg = error ? <p className={errorColor}>{error}</p> : null;
        return (
            <form className="form song" onSubmit={this.submit}>
                <h3>Song</h3>
                <label>name (required)</label>
                <input type="text" required={true} onChange={this.handleChange} id="name" value={name}/>
                <label>image</label>
                {image}
                <input type="file" onChange={this.onPhotoSelected} accept="image/png, image/jpeg"/>
                <label>song (required)</label>
                <input type="file" onChange={this.onAudioSelected} accept=".mp3"/>
                <label>author (required)</label>
                <select onChange={this.handleChange} id="authorId">
                    <option value=""></option>
                    {authors.map(author => (
                        <option value={author.id} key={author.id}>{author.name}</option>
                    ))}
                </select>
                <label>the song belongs to an album ?</label>
                <select onChange={this.handleChange} id="albumId">
                    <option value=""></option>
                    {albums.map(album => (
                        <option value={album.id} key={album.id}>{album.name}</option>
                    ))}
                </select>
                <label>Pick a Category (required)</label>
                <select onChange={this.handleChange} id="categoryId">
                    <option value=""></option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                {errorMsg}
                <button className="">Add</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        albums: getAlbums(state),
        authors: getAuthors(state),
        categories: getCategories(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSongs: (songs) => dispatch(setSongs(songs)),
    }
};

export const SmartSongForm = connect(mapStateToProps, mapDispatchToProps)(SongForm);

