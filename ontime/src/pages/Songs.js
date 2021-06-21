import * as React from "react";
import {connect} from "react-redux";
import {getSongs} from "../selectors/song/getSongs";
import {SongList} from "../components/SongList";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getSongsByCategory} from "../selectors/song/getSongsByCategory";
import {SmartHeading} from "../components/Heading";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

export class Songs extends React.PureComponent {

    render() {
        const {songs} = this.props;
        return (
            <div className="container">
                <SmartHeading icon={faMusic} pageTitle="Songs"/>
                <SongList songs={songs}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const songs = typeof categoryId === "number" ? getSongsByCategory(state)(categoryId) : getSongs(state);
    return {
        songs,
    }
};

export const SmartSongs = connect(mapStateToProps)(Songs);