import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {getUser} from "../../selectors/user/getUser";
import {connect} from "react-redux";


class User extends React.PureComponent {
    render() {
        const {user, userLogged} = this.props;
        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    {
                        userLogged.username !== user.username ? (
                            <>
                                <FontAwesomeIcon icon={faEdit} size="lg" id={user.id} onClick={this.props.edit}
                                                 color="#D7E944" style={{marginRight: "5px"}}/>

                                <FontAwesomeIcon icon={faTrashAlt} size="lg" id={user.id} onClick={this.props.delete}
                                                 color="#e04343"/>
                            </>
                        ) : null
                    }

                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogged: getUser(state)
    }
};

export const SmartUser = connect(mapStateToProps)(User);
