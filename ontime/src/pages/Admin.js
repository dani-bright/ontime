import * as React from "react";
import "../styles/Form.css"
import {SmartUserList} from "../components/admin/UserList";
import {getUser} from "../selectors/user/getUser";
import {isAdmin} from "../selectors/user/isAdmin";
import {connect} from "react-redux";
import {SmartAdminSongList} from "../components/admin/AdminSongList";

export class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toDisplay: "songs",
        };
        if (!this.props.isAdmin) {
            this.props.history.push('/');
        }
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
            <div className="container">
                <h2>Admin page</h2>
                <button onClick={this.displayUsers}>Manage users</button>
                <button onClick={this.displaySongs}>Manage songs</button>
                {users}
                {songs}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: isAdmin(state),
        user: getUser(state),
    }
};

export const SmartAdmin = connect(mapStateToProps)(Admin);