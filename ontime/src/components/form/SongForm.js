import * as React from "react";
import {connect} from "react-redux";
import SongService from "../../services/SongService";
import {setSongs} from "../../action-creator/songs/setSongs";
import {getAlbums} from "../../selectors/album/getAlbums";
import {getAuthors} from "../../selectors/getAuthors";
import {getCategories} from "../../selectors/category/getCategories";
import AlbumService from "../../services/AlbumService";
import {setAlbums} from "../../action-creator/albums/setAlbums";
import {PopupContext} from "../../contexts/PopupContext";

export class SongForm extends React.PureComponent {
    static contextType = PopupContext;
    state = {
        img: null,
        audio: null,
        categoryId: "",
        albumId: "",
        authorId: "",
        name: "",
        error: "",
        showError: false,
        showLoader: false,
        errorColor: "error",
    };

    async componentDidMount() {
        const {songId} = this.props;
        if (songId) {
            const response = await SongService.findOne(songId);
            if (response.ok) {
                let data = await response.json();
                this.setState({
                    name: data.song.name,
                });
            }
        }
    }

    onFileSelected = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                file.type.search('image') !== -1 ? this.setState({img: event.target.result}) : this.setState({audio: event.target.result})
            };
            reader.readAsDataURL(file);
        }
    };

    create = async () => {
        const {name, categoryId, authorId, audio} = this.state;
        if (!name || !categoryId || !authorId || !audio) {
            this.setState({error: "all required fields have to be filled", errorColor: "error", showError: true});
            this.hideMessage();
            return false;
        }
        const response = await SongService.create(this.state);
        this.setState({showLoader: true});
        const data = await response.json();
        //if adding song doesnt work check your mysql configuration file and set to max_allowed_packet 20M it should be enough
        if (response.ok) {
            const songs = await SongService.findAll();
            const dataSongs = await songs.json();
            this.setState({showLoader: false});
            this.props.setSongs(dataSongs.songs);

            //refresh the songs for an album
            const albums = await AlbumService.findAll();
            const dataAlbums = await albums.json();
            this.props.setAlbums(dataAlbums.albums);
            this.setState({
                error: "song added to database",
                name: "",
                showError: true,
                errorColor: "success",
            });
            this.hideMessage();

        } else {
            this.setState({error: data.message, errorColor: "error", showError: true});
            this.hideMessage();
        }
    };

    edit = async (id) => {
        const {name, img} = this.state;
        if (!name) {
            this.setState({error: "the name can't be empty", errorColor: "error", showError: true});
            this.hideMessage();
            return false;
        }
        this.setState({showLoader: true});

        const body = img ? {name, img} : {name};
        const response = await SongService.update(id, body);
        const data = await response.json();
        if (response.ok) {
            const newSongs = await SongService.findAll();
            this.setState({showLoader: false});

            await newSongs.json().then((data) => {
                //refresh list
                this.props.setSongs(data.songs);
                this.context.popup.show(null, null);
            });

        } else {
            this.setState({error: data.message, errorColor: "error", showError: true});
            this.hideMessage();
        }
    };


    submit = async (e) => {
        e.preventDefault();
        const {songId} = this.props;
        if (!songId) {
            await this.create()
        } else {
            await this.edit(songId);
        }
    };

    hideMessage = () => {
        setTimeout(() => {
            this.setState({showError: false})
        }, 2500);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        const {img, error, name, errorColor, showError, showLoader} = this.state;
        const {albums, authors, categories, songId} = this.props;
        const image = img ? <img src={img} alt="" width={60}/> : null;
        const errorMsg = error ? <p className={`message ${showError && 'active'} ${errorColor}`}>{error}</p> : null;
        const creationModeFields = !songId ? <>
            <label>song (required)</label>
            <input type="file" onChange={this.onFileSelected} accept=".mp3"/>
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
        </> : null;

        const button = songId ? <button className="">update</button> : <button className="">Add</button>;

        const displayButton = songId && !showLoader ? button : !showLoader ? button : null;


        return (
            <form className="form song" onSubmit={this.submit}>
                <h3>Song</h3>
                <label>name (required)</label>
                <input type="text" onChange={this.handleChange} id="name" value={name}/>
                <label>image</label>
                {image}
                <input type="file" onChange={this.onFileSelected} accept="image/png, image/jpeg"/>
                {creationModeFields}
                {errorMsg}
                {displayButton}
                <img src={require("../../assets/images/loader.gif")}
                     className={`loader ${showLoader && 'active'}`} alt="loader"/>
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
        setAlbums: (albums) => dispatch(setAlbums(albums)),
    }
};

export const SmartSongForm = connect(mapStateToProps, mapDispatchToProps)(SongForm);

