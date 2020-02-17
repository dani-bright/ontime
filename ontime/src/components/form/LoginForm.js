import * as React from "react";
import UserServiceInstance from "../../services/UserService";
import {PopupContext} from "../../contexts/PopupContext";
import '../../styles/Form.css';
import {connect} from "react-redux";
import {setUser} from "../../action-creator/users/user/setUser";

export class LoginForm extends React.PureComponent {
    static contextType = PopupContext;
    state = {
        username: "",
        password: ""
    };

    submit = async (e) => {
        e.preventDefault();
        const response = await UserServiceInstance.auth(this.state);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            this.props.setUser(data.user);
            //fermer popup
            this.context.popup.show(null, null);
        } else {
            //msg d'erreur
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        return (
                <form onSubmit={this.submit}>
                    <div>
                        <label>username</label>
                        <input type="text" id="username" className="form-control" onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" id="password" className="form-control" onChange={this.handleChange}/>
                    </div>

                    <button className="btn btn-primary">Connexion</button>
                </form>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
};

export const SmartLoginForm = connect(undefined, mapDispatchToProps)(LoginForm)
