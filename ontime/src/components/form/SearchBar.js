import * as React from "react";
import "../../styles/Components.css"

export default class SearchBar extends React.PureComponent {
    render() {
        return (
            <form className="searchBar">
                <input type="text" placeholder="Recherche"/>
                <button></button>
            </form>
        )
    }
}