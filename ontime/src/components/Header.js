import * as React from "react";
import {useContext} from "react";
import {Link} from "react-router-dom";
import '../styles/Header.css';
import SearchBar from "./form/SearchBar";
import {faAlignJustify, faSignInAlt, faSignOutAlt, faUpload, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MenuContext} from "../contexts/MenuContext";
import {PopupContext} from "../contexts/PopupContext";
import {SmartLoginForm} from "./form/LoginForm";
import {connect} from "react-redux";
import {setUser} from "../action-creator/users/user/setUser";
import {isAdmin} from "../selectors/user/isAdmin";
import {getUser} from "../selectors/user/getUser";
import {SmartSubscribeForm} from "./form/SubscribeForm";


const Header = (props) => {
    const menuContext = useContext(MenuContext);
    const popupContext = useContext(PopupContext);

    const showMenu = () => {
        menuContext.menu.show();
    };
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setUser({
            user: null,
            favorites: [],
        });
    };
    const loginForm = () => {
        popupContext.popup.show("Connexion",
            <SmartLoginForm/>)
    };
    const subscribeForm = () => {
        popupContext.popup.show("Subscription",
            <SmartSubscribeForm/>)
    };
    return (
        <nav className="navBar">
            <div className="burgerContainer" onClick={showMenu}>
                <FontAwesomeIcon icon={faAlignJustify} size="2x" style={{color: 'white'}}/>
            </div>
            <Link to="/"><img src={require("../assets/images/logo.png")} alt=""/></Link>
            <SearchBar/>
            {
                props.user ? (
                    <>
                        <button className="logout" onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} size="lg"/> logout
                        </button>
                        <p>loggged in as <span style={{color: "green"}}>{props.user.username}</span></p>
                    </>
                ) : <>
                    <button className="login" onClick={loginForm}>
                        <FontAwesomeIcon icon={faSignInAlt} size="lg"/> Login
                    </button>
                    <button className="subscribe" onClick={subscribeForm}>
                        subscribe
                    </button>
                </>
            }
            {
                props.isAdmin ? (
                    <>
                        <Link to="uploads" className="button">
                            <FontAwesomeIcon icon={faUpload} size="lg"/> upload
                        </Link>
                        <Link to="admin" className="button">
                            <FontAwesomeIcon icon={faUserSecret} size="lg"/>
                        </Link>
                    </>

                ) : null}
        </nav>
    )
};
const mapStateToProps = (state) => {
    return {
        user: getUser(state),
        isAdmin: isAdmin(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
    }
};

export const SmartHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;