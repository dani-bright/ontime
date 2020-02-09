import * as React from "react";
import {connect} from "react-redux";
import {Heading} from "../components/Heading";
import {SmartSongDetail} from "../components/SongDetails";
import {getUser} from "../selectors/getUser";
import {getUserFavorites} from "../selectors/getUserFavorites";
import {getSelectedCategory} from "../selectors/getSelectedCategory";
import {getSongsByCategorySorted} from "../selectors/getSongsByCategorySorted";
import {getSongsSorted} from "../selectors/getSongsSorted";
import {getFavoritesByCategory} from "../selectors/getFavoritesByCategory";

export class Favorites extends React.PureComponent {
    state = {
        favorites: []
    };

    async componentDidMount() {
        // if (this.props.user) {
        //     const favorites = await FavoriteService.findAll(this.props.user.id);
        //     if (favorites.ok) {
        //         let data = await favorites.json();
        //         const favoriteSongs = data.favorites.filter(favorite => favorite.songId)
        //         this.setState({favorites: favoriteSongs});
        //     }
        // }

    }

    render() {
        const {favorites} = this.props;
        return (
            <>
                {
                    this.props.user ? (
                        <div className="container">
                            <Heading pageTitle="Favorites"/>
                            {favorites.map((favoriteSong, index) => (
                                <div key={favoriteSong.id}>
                                    <SmartSongDetail idSong={favoriteSong.id} key={index}/>
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