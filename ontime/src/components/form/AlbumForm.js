import * as React from "react";
import {connect} from "react-redux";
import AlbumService from "../../services/AlbumService";
import {getAuthors} from "../../selectors/getAuthors";
import {getCategories} from "../../selectors/category/getCategories";
import {setAlbums} from "../../action-creator/albums/setAlbums";

export class AlbumForm extends React.PureComponent {
    state = {
        img: null,
        categoryId: "",
        authorId: "",
        name: "",
        error: "",
        errorColor: "error",
        showError: false,
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


    submit = async (e) => {
        e.preventDefault();
        const {name, categoryId, authorId} = this.state;
        if (!name || !categoryId || !authorId) {
            this.setState({error: "all required fields have to be filled", errorColor: "error", showError: true});
            this.hideMessage();
            return false;
        }
        const response = await AlbumService.create(this.state);
        const data = await response.json();
        if (response.ok) {
            this.setState({
                error: "album added to database",
                img: null,
                categoryId: "",
                authorId: "",
                name: "",
                errorColor: "success",
                showError: true,
            });
            this.hideMessage();
            const albums = await AlbumService.findAll();
            const dataAlbums = await albums.json();
            this.props.setAlbums(dataAlbums.albums);

        } else {
            this.setState({error: data.message, errorColor: "error", showError: true})
            this.hideMessage();
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
        const {img, error, name, errorColor, showError} = this.state;
        const {authors, categories} = this.props;
        const image = img ? <img src={img} width={60} alt="songImg"/> : null;
        const errorMsg = error ? <p className={`message ${showError && 'active'} ${errorColor}`}>{error}</p> : null;
        return (
            <form className="form album" onSubmit={this.submit}>
                <h3>Album</h3>
                <label>name (required)</label>
                <input type="text" onChange={this.handleChange} id="name" value={name}/>
                <label>image</label>
                {image}
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
