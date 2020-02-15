import * as React from "react";
import UserService from "../../services/UserService";
import {SmartUser} from "./User";
import {getUsers} from "../../selectors/getUsers";
import {setUsers} from "../../action-creator/users/setUsers";
import {connect} from "react-redux";
import {PopupContext} from "../../contexts/PopupContext";
import {SmartUserForm} from "../form/UserForm";

class UserList extends React.Component {
    static contextType = PopupContext;

    async componentDidMount() {
        const userResponse = await UserService.findAll();
        if (userResponse.ok) {
            const dataUser = await userResponse.json();
            this.props.setUsers(dataUser.users)
        }
    }


    deleteUser = async (id) => {
        const response = await UserService.remove(id);
        if (response.ok) {
            const index = this.props.users.findIndex(user => user.id === id);
            this.props.users.splice(index, 1);
            this.setState({})
        }
    };

    editUser = async (id) => {
        this.context.popup.show("Connexion",
            <SmartUserForm userId={id}/>)
    };

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>prenom</th>
                    <th>noms</th>
                    <th>email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.users.map(user => {
                        return (
                            <SmartUser key={user.id} user={user} delete={() => {
                                this.deleteUser(user.id)
                            }} edit={() => {
                                this.editUser(user.id)
                            }}/>
                        );
                    })

                }

                </tbody>
            </table>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => dispatch(setUsers(users))
    }
};

export const SmartUserList = connect(mapStateToProps, mapDispatchToProps)(UserList)