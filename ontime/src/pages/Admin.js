import * as React from "react";
import "../styles/Form.css"
import {SmartUserList} from "../components/admin/UserList";
import {getUser} from "../selectors/user/getUser";
import {isAdmin} from "../selectors/user/isAdmin";
import {connect} from "react-redux";
import {SmartAdminSongList} from "../components/admin/AdminSongList";
import {setPlaylist} from "../action-creator/playlist/setPlaylist";
import {getSongs} from "../selectors/song/getSongs";

export class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toDisplay: "songs",
        };
        if (!this.props.isAdmin) {
            this.props.history.push('/');
        }
        this.props.setPlaylist(this.props.songs);
    }

    componentDidUpdate() {
        if (!this.props.isAdmin) {
            this.props.history.push('/');
        }
    }

    displaySongs = () => {
        this.setState({
            toDisplay: "songs"
        })
    };

    displayUsers = () => {
        this.setState({
            toDisplay: "users"
        })
    };


    render() {
        const {toDisplay} = this.state;
        const users = toDisplay === "users" ?
            <SmartUserList/> : null;
        const songs = toDisplay === "songs" ?
            <SmartAdminSongList/> : null;

        return (
            <div className="tableContainer">
                <div style={{marginTop: '70px'}}>
                    <button onClick={this.displayUsers}>Manage users</button>
                    <button onClick={this.displaySongs}>Manage songs</button>
                </div>
                <div className="container">
                    {users}
                    {songs}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songs: getSongs(state),
        isAdmin: isAdmin(state),
        user: getUser(state),
    }
};

const mapDispatchToProps = (dispatch) => ({
    setPlaylist: (songs) => dispatch(setPlaylist(songs))
});

export const SmartAdmin = connect(mapStateToProps, mapDispatchToProps)(Admin);