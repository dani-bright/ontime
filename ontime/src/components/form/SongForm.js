import * as React from "react";
import UserService from "../../services/UserService";
import {PopupContext} from "../../contexts/PopupContext";
import {connect} from "react-redux";
import {setUser} from "../../action-creator/user/setUser";
import SongService from "../../services/SongService";

export class SongForm extends React.PureComponent {
    state = {
        imageSrc: null,
        audioSrc: null,
        categoryId: "",
        albumId: "",
        authorId: "",
        name: "",
        error: ""
    };

    onPhotoSelected = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({imageSrc: event.target.result})
        };
        reader.readAsDataURL(file);
    };
    onAudioSelected = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({audioSrc: event.target.result})
        };
        reader.readAsDataURL(file);
    };


    submit = async (e) => {
        e.preventDefault();
        const {name, categoryId, albumId, audioSrc, authorId, imageSrc} = this.state;
        const response = await SongService.create({
            name,
            categoryId,
            albumId,
            img: imageSrc,
            audio: audioSrc,
            authorId,
        });
        const data = await response.json();
        //if adding song doesnt work check your mysql configuration file and set to max_allowed_packet 20M it should be enough
        if (response.ok) {
            this.setState({error: "song added to database"})

        } else {
            this.setState({error: JSON.stringify(data.message)})
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        const {imageSrc, error} = this.state;
        const {albums, authors, categories} = this.props;
        const img = imageSrc ? <img src={imageSrc} alt="" width={60}/> : null;
        const errorMsg = error ? <p>{error}</p> : null;
        return (
            <form className="form song" onSubmit={this.submit}>
                <h3>Song</h3>
                <label>name (required)</label>
                <input type="text" required={true} onChange={this.handleChange} id="name"/>
                <label>image</label>
                {img}
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

