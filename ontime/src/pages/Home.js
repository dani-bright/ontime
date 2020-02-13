import * as React from "react";
import {connect} from "react-redux";
import {getUser} from "../selectors/user/getUser";
import {getSongs} from "../selectors/song/getSongs";
import {SongList} from "../components/SongList";
import {getSelectedCategory} from "../selectors/category/getSelectedCategory";
import {getSongsByCategory} from "../selectors/song/getSongsByCategory";
import {Heading} from "../components/Heading";
import {faHome} from "@fortawesome/free-solid-svg-icons";

export class Home extends React.PureComponent {
    render() {
        const {user, songs} = this.props;
        return (
            <div className="container">
                <Heading pageTitle="Home" icon={faHome}/>

                <SongList songs={songs}/>
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

export const SmartHome = connect(mapStateToProps)(Home);