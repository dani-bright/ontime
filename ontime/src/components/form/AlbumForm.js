import * as React from "react";
import {connect} from "react-redux";
import AlbumService from "../../services/AlbumService";
import {getAuthors} from "../../selectors/getAuthors";
import {getCategories} from "../../selectors/category/getCategories";
import {setAlbums} from "../../action-creator/albums/setAlbums";

export class AlbumForm extends React.PureComponent {
    state = {
        imageSrc: null,
        categoryId: "",
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
                this.setState({imageSrc: event.target.result})
            };
            reader.readAsDataURL(file);
        }
    };


    submit = async (e) => {
        e.preventDefault();
        const {name, categoryId, authorId, imageSrc} = this.state;
        const response = await AlbumService.create({
            name,
            categoryId,
            img: imageSrc,
            authorId,
        });
        const data = await response.json();
        if (response.ok) {
            this.setState({
                error: "album added to database",
                imageSrc: null,
                categoryId: "",
                authorId: "",
                name: "",
                errorColor: "success"
            });
            const albums = await AlbumService.findAll();
            const dataAlbums = await albums.json();
            this.props.setAlbums(dataAlbums.albums);

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
        const {imageSrc, error, name, errorColor} = this.state;
        const {authors, categories} = this.props;
        const img = imageSrc ? <img src={imageSrc} alt="" width={60}/> : null;
        const errorMsg = error ? <p className={errorColor}>{error}</p> : null;
        return (
            <form className="form album" onSubmit={this.submit}>
                <h3>Album</h3>
                <label>name (required)</label>
                <input type="text" required={true} onChange={this.handleChange} id="name" value={name}/>
                <label>image</label>
                {img}
                <input type="file" onChange={this.onPhotoSelected} accept="image/png, image/jpeg"/>

                <label>author (required)</label>
                <select onChange={this.handleChange} id="authorId">
                    <option value=""></option>
                    {authors.map(author => (
                        <option value={author.id} key={author.id}>{author.name}</option>
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
        authors: getAuthors(state),
        categories: getCategories(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbums: (albums) => dispatch(setAlbums(albums)),
    }
};

export const SmartAlbumForm = connect(mapStateToProps, mapDispatchToProps)(AlbumForm);
