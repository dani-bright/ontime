import * as React from "react";
import UserService from "../../services/UserService";
import {PopupContext} from "../../contexts/PopupContext";
import '../../styles/Form.css';
import {connect} from "react-redux";
import {setUser} from "../../action-creator/user/setUser";

export class SubscribeForm extends React.PureComponent {
    static contextType = PopupContext;
    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        error: "",
        errorColor: "error",
    };

    submit = async (e) => {
        e.preventDefault();
        const response = await UserService.create(this.state);
        const data = await response.json();
        if (response.ok) {
            //fermer popup
            setTimeout(() => {
                this.context.popup.show(null, null);
            }, 500)
        } else {
            this.setState({error: JSON.stringify(data.message), errorColor: "error"})
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        const {error, errorColor} = this.state;
        const errorMsg = error ? <p className={errorColor}>{error}</p> : null;
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div>
                        <label>name</label>
                        <input type="text" id="name" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>username</label>
                        <input type="text" id="username" onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="text" id="password" className="form-control" onChange={this.handleChange}/>
                    </div>
                    {errorMsg}
                    <button className="btn btn-primary">Connexion</button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
};

export const SmartSubscribeForm = connect(undefined, mapDispatchToProps)(SubscribeForm)
