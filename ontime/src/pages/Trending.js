import * as React from "react";
import {connect} from "react-redux";
import {SongList} from "../components/SongList";
import {getSelectedCategory} from "../selectors/getSelectedCategory";
import {getSongsSorted} from "../selectors/getSongsSorted";
import {getSongsByCategorySorted} from "../selectors/getSongsByCategorySorted";
import {Heading} from "../components/Heading";
import {faBroadcastTower} from "@fortawesome/free-solid-svg-icons";

export class Trending extends React.PureComponent {

    render() {
        const {songs} = this.props;
        return (
            <div className="container">
                <Heading icon={faBroadcastTower} pageTitle="Trending"/>
                <SongList songs={songs}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const songs = typeof categoryId === "number" ? getSongsByCategorySorted(state)(categoryId) : getSongsSorted(state);
    return {
        songs,
    }
};

export const SmartTrending = connect(mapStateToProps)(Trending);