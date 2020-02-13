import * as React from "react";
import {connect} from "react-redux";
import {Heading} from "../components/Heading";
import {SmartSongDetail} from "../components/SongDetails";
import {getUser} from "../selectors/user/getUser";
import {getUserFavorites} from "../selectors/user/getUserFavorites";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getFavoritesByCategory} from "../selectors/getFavoritesByCategory";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export class Favorites extends React.PureComponent {
    state = {
        favorites: []
    };


    render() {
        const {favorites} = this.props;
        return (
            <>
                {
                    this.props.user ? (
                        <div className="container">
                            <Heading icon={faThumbsUp} pageTitle="Favorites"/>
                            {favorites.map((favorite, index) => (
                                <div key={favorite.id}>
                                    <SmartSongDetail idSong={favorite.songId} key={index}/>
                                </div>
                            ))}
                        </div>) : <p
                        style={{
                            color: 'black', position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%)', fontSize: '20px', textTransform: 'uppercase'
                        }}>You have to be logged in</p>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const categoryId = getSelectedCategory(state);
    const favorites = typeof categoryId === "number" ? getFavoritesByCategory(state)(categoryId) : getUserFavorites(state);
    return {
        user: getUser(state),
        favorites,
    }
};

export const SmartFavorites = connect(mapStateToProps)(Favorites);