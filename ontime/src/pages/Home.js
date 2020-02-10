import * as React from "react";
import {AuthenticationContext} from "../contexts/AuthentificationContext";
import {connect} from "react-redux";
import {getUser} from "../selectors/getUser";
import {getSongs} from "../selectors/getSongs";
import {SongList} from "../components/SongList";
import {getSelectedCategory} from "../selectors/getSelectedCategory";
import {getSongsByCategory} from "../selectors/getSongsByCategory";
import {Heading} from "../components/Heading";
import {faHome} from "@fortawesome/free-solid-svg-icons";

export class Home extends React.PureComponent {
    static contextType = AuthenticationContext;

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