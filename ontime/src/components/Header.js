import * as React from "react";
import {useContext} from "react";
import {Link} from "react-router-dom";
import '../styles/Header.css';
import {
    faAlignJustify,
    faSignInAlt,
    faSignOutAlt,
    faUpload,
    faUser,
    faUserSecret
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MenuContext} from "../contexts/MenuContext";
import {PopupContext} from "../contexts/PopupContext";
import {SmartLoginForm} from "./form/LoginForm";
import {connect} from "react-redux";
import {setUser} from "../action-creator/users/user/setUser";
import {isAdmin} from "../selectors/user/isAdmin";
import {getUser} from "../selectors/user/getUser";
import {SmartUserForm} from "./form/UserForm";
import {getSongs} from "../selectors/song/getSongs";
import SearchBar from "./form/SearchBar";


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
            <SmartUserForm/>)
    };
    return (
        <nav className="navBar">
            <div className="left">
                <div className="burgerContainer" onClick={showMenu}>
                    <FontAwesomeIcon icon={faAlignJustify} size="2x" style={{color: 'white'}}/>
                </div>
                <Link className="logo" to="/"><img src={require("../assets/images/logo.png")} alt=""/></Link>
            </div>

            <SearchBar/>
            <div className="right">
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
                {
                    props.user ? (
                        <>
                            <button className="logout" onClick={logout}>
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg"/> logout
                            </button>
                            <p>
                                <FontAwesomeIcon icon={faUser} size="lg" color="#46d2e9"/>
                                <span style={{color: "#46d2e9", marginLeft: "4px"}}>{props.user.username}</span>
                            </p>
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
            </div>


        </nav>
    )
};
const mapStateToProps = (state) => {
    return {
        songs: getSongs(state),
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