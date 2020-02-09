import * as React from "react";
import {AuthenticationContext} from "../contexts/AuthentificationContext";
import {connect} from "react-redux";
import {getUser} from "../selectors/getUser";
import {getSongs} from "../selectors/getSongs";
import {SongList} from "../components/SongList";
import {getSelectedCategory} from "../selectors/getSelectedCategory";
import {getSongsByCategory} from "../selectors/getSongsByCategory";
import {Heading} from "../components/Heading";

export class Uploads extends React.PureComponent {
    static contextType = AuthenticationContext;

    render() {
        const {user, songs} = this.props;
        return (
            <div className="container">
                <h1>upload page</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //returns an object containing an empty object when selectedCategory is undefined
    const categoryId = getSelectedCategory(state);
    const songs = typeof categoryId === "number" ? getSongsByCategory(state)(categoryId) : getSongs(state);
    return {
        user: getUser(state),
        songs,
    }
};

export const SmartUploads = connect(mapStateToProps)(Uploads);