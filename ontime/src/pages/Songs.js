import * as React from "react";
import {connect} from "react-redux";
import {getSongs} from "../selectors/getSongs";
import {SongList} from "../components/SongList";
import {SmartCategorySelector} from "../components/CategorySelector";
import {getSelectedCategory} from "../selectors/getSelectedCategory";
import {getSongsByCategory} from "../selectors/getSongsByCategory";
import {Heading} from "../components/Heading";

export class Songs extends React.PureComponent {

    render() {
        const {songs} = this.props;
        return (
            <div className="container">
                <Heading pageTitle="Songs"/>
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