import * as React from "react";
import {connect} from "react-redux";
import AuthorService from "../../services/AuthorService";
import {setAuthors} from "../../action-creator/authors/setAuthors";

export class AuthorForm extends React.PureComponent {
    state = {
        name: "",
        error: ""
    };


    submit = async (e) => {
        e.preventDefault();
        const {name} = this.state;
        const response = await AuthorService.create({
            name,
        });
        const data = await response.json();
        if (response.ok) {
            this.setState({error: "author added to database", name: ""})
            const authors = await AuthorService.findAll();
            const dataAuthors = await authors.json();
            this.props.setAuthors(dataAuthors.authors);

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
        const {error} = this.state;
        const errorMsg = error ? <p>{error}</p> : null;
        return (
            <form className="form author" onSubmit={this.submit}>
                <h3>Author</h3>
                <label>name (required)</label>
                <input type="text" required={true} onChange={this.handleChange} id="name"/>
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

