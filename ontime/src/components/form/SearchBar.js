import * as React from "react";
import "../../styles/SearchBar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";

class SearchBar extends React.PureComponent {
    state = {
        query: "",
    };

    redirect = (e) => {
        e.preventDefault();
        const {query} = this.state;
        this.props.history.push({
            pathname: "/search",
            state: {
                query: query
            }
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };


    render() {
        const {query} = this.state;

        return (
            <>
                <form className="searchBar">
                    <input type="text" placeholder="Search for a song or an artist" id="query"
                           onChange={this.handleChange}
                           value={query}/>
                    <button onClick={this.redirect}>
                        <FontAwesomeIcon icon={faSearch} size="lg"/>
                    </button>
                </form>
            </>
        )
    }
}


export default withRouter(SearchBar);