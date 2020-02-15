import * as React from "react";
import {connect} from "react-redux";
import AuthorService from "../../services/AuthorService";
import {setAuthors} from "../../action-creator/authors/setAuthors";

export class AuthorForm extends React.PureComponent {
    state = {
        name: "",
        error: "",
        errorColor: "error",
        showError: false,
    };


    submit = async (e) => {
        e.preventDefault();
        const response = await AuthorService.create(this.state);
        const data = await response.json();
        if (response.ok) {
            this.setState({error: "author added to database", name: "", errorColor: "success", showError: true})
            const authors = await AuthorService.findAll();
            const dataAuthors = await authors.json();
            this.props.setAuthors(dataAuthors.authors);
            this.hideMessage();

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
        const {error, name, errorColor, showError} = this.state;
        const errorMsg = error ? <p className={`message ${showError && 'active'} ${errorColor}`}>{error}</p> : null;
        return (
            <form className="form author" onSubmit={this.submit}>
                <h3>Author</h3>
                <label>name (required)</label>
                <input type="text" required={true} onChange={this.handleChange} id="name" value={name}/>
                {errorMsg}
                <button className="">Add</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthors: (authors) => dispatch(setAuthors(authors)),
    }
};

export const SmartAuthorForm = connect(undefined, mapDispatchToProps)(AuthorForm);

