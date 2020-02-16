import * as React from "react";
import UserServiceInstance from "../../services/UserService";
import {PopupContext} from "../../contexts/PopupContext";
import '../../styles/Form.css';
import {connect} from "react-redux";
import {setUsers} from "../../action-creator/users/setUsers";

export class UserForm extends React.PureComponent {
    static contextType = PopupContext;

    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        error: "",
        errorColor: "error",
        showError: false,
    };

    async componentDidMount() {
        const {userId} = this.props;
        if (userId) {
            const response = await UserServiceInstance.findOne(userId);
            if (response.ok) {
                let data = await response.json();
                this.setState({
                    name: data.user.name,
                    username: data.user.username,
                    email: data.user.email,
                    //I know its not securised
                    password: data.user.password,
                });
            }
        }
    }


    submit = async (e) => {
        e.preventDefault();
        const {userId} = this.props;

        if (!userId) {
            await this.create()
        } else {
            await this.edit(userId)
        }

    };

    edit = async (id) => {
        const {name, username, email, password} = this.state;
        if (!name || !username || !email || !password) {
            this.setState({error: "all fields have to be filled", errorColor: "error", showError: true});
            this.hideMessage();
            return false;
        }
        const response = await UserServiceInstance.update(id, this.state);
        const data = await response.json();
        if (response.ok) {
            const newUsers = await UserServiceInstance.findAll();
            await newUsers.json().then((data) => {
                //refresh list
                this.props.setUsers(data.users);
                this.context.popup.show(null, null);
            });

        } else {
            this.setState({error: data.message, errorColor: "error", showError: true});
            this.hideMessage();
        }
    };


    hideMessage = () => {
        setTimeout(() => {
            this.setState({showError: false})
        }, 2500);
    };

    create = async () => {
        const {name, username, email, password} = this.state;
        if (!name || !username || !email || !password) {
            this.setState({error: "all fields have to be filled", errorColor: "error", showError: true});
            this.hideMessage();
            return false;
        }
        const response = await UserServiceInstance.create(this.state);
        const data = await response.json();
        if (response.ok) {
            //close popup
            setTimeout(() => {
                this.context.popup.show(null, null);
            }, 500)
        } else {
            this.setState({error: data.message, errorColor: "error", showError: true})
            this.hideMessage();
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        const {error, errorColor, name, username, password, email, showError} = this.state;
        const errorMsg = error ? <p className={`message ${showError && 'active'} ${errorColor}`}>{error}</p> : null;
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div>
                        <label>name</label>
                        <input type="text" id="name" onChange={this.handleChange} value={name}/>
                    </div>
                    <div>
                        <label>username</label>
                        <input type="text" id="username" onChange={this.handleChange} value={username}/>
                    </div>

                    <div>
                        <label>email</label>
                        <input type="email" id="email" onChange={this.handleChange} value={email}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="text" id="password" className="form-control" onChange={this.handleChange}
                               value={password}/>
                    </div>
                    {errorMsg}
                    <button className="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (user) => dispatch(setUsers(user))
    }
};

export const SmartUserForm = connect(undefined, mapDispatchToProps)(UserForm);
