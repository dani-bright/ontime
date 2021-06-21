import * as React from "react";
import {connect} from "react-redux";
import {SongList} from "../components/SongList";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getSongsSortedByListened} from "../selectors/song/getSongsSortedByListened";
import {getSongsByCategorySorted} from "../selectors/song/getSongsByCategorySorted";
import {SmartHeading} from "../components/Heading";
import {faBroadcastTower} from "@fortawesome/free-solid-svg-icons";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";

export class Trending extends React.PureComponent {

    componentDidMount() {
        this.props.setPlaylist(this.props.songs);
    }

    render() {
        const {songs} = this.props;
        return (
            <div className="container">
                <SmartHeading icon={faBroadcastTower} pageTitle="Trending"/>
                <SongList songs={songs}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const songs = typeof categoryId === "number" ? getSongsByCategorySorted(state)(categoryId) : getSongsSortedByListened(state);
    return {
        songs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPlaylist: (songs) => dispatch(setPlaylist(songs)),
    }
};

export const SmartTrending = connect(mapStateToProps, mapDispatchToProps)(Trending);