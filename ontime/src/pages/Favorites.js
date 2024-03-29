import * as React from "react";
import {connect} from "react-redux";
import {SmartHeading} from "../components/Heading";
import {getUser} from "../selectors/user/getUser";
import {getUserFavorites} from "../selectors/user/getUserFavorites";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getFavoritesByCategory} from "../selectors/getFavoritesByCategory";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";
import {getFavoritesSongs} from "../selectors/getFavoritesSongs";
import {SongList} from "../components/SongList";

export class Favorites extends React.PureComponent {
    // componentDidMount() {
    //     this.props.setPlaylist(this.props.songs);
    // }

    render() {
        const {favorites, user, songs} = this.props;
        return (
            <div className="container">
                <SmartHeading pageTitle="Favorites" icon={faThumbsUp}/>
                {
                    user && songs.length ? (
                        <SongList songs={favorites}/>) : <p
                        style={{
                            color: 'black', position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%)', fontSize: '20px', textTransform: 'uppercase'
                        }}>You have to be logged in</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const favorites = typeof categoryId === "number" ? getFavoritesByCategory(state)(categoryId) : getUserFavorites(state);
    return {
        user: getUser(state),
        favorites,
        songs: getFavoritesSongs(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPlaylist: (songs) => dispatch(setPlaylist(songs)),
    }
};

export const SmartFavorites = connect(mapStateToProps, mapDispatchToProps)(Favorites);