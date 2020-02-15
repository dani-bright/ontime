import * as React from "react";
import "../../styles/SearchBar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends React.PureComponent {
    render() {
        return (
            <form className="searchBar">
                <input type="text" placeholder="Recherche"/>
                <button>
                    <FontAwesomeIcon icon={faSearch} size="lg"/>
                </button>
            </form>
        )
    }
}