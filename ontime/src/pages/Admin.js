import * as React from "react";
import "../styles/Form.css"
import {SmartUserList} from "../components/UserList";
import {getUser} from "../selectors/user/getUser";
import {isAdmin} from "../selectors/user/isAdmin";
import {connect} from "react-redux";

export class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toDisplay: "users",
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
            <SmartUserList/> : null;

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