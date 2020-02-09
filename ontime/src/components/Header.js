import * as React from "react";
import {useContext, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import '../styles/Header.css';
import SearchBar from "./form/SearchBar";
import {faAlignJustify} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MenuContext} from "../contexts/MenuContext";
import {PopupContext} from "../contexts/PopupContext";
import {AuthenticationContext} from "../contexts/AuthentificationContext";
import {SmartLoginForm} from "./form/LoginForm";


const Header = () => {
    const menuContext = useContext(MenuContext);
    const popupContext = useContext(PopupContext);
    const authContext = useContext(AuthenticationContext);
    useEffect(() => {
        localStorage.getItem('token') && authContext.setIsAuth(true);
    });

    const showMenu = () => {
        menuContext.menu.show();
    };
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");

        authContext.setIsAuth(false)

    };
    const loginForm = () => {
        popupContext.popup.show("Connexion",
            <SmartLoginForm/>)
    };
    return (
        <nav className="navBar">
            <div className="burgerContainer" onClick={showMenu}>
                <FontAwesomeIcon icon={faAlignJustify} size="2x" style={{color: 'white'}}/>
            </div>
            <Link to="/"><img src={require("../assets/images/logo.png")} alt=""/></Link>
            <SearchBar/>
            <button onClick={loginForm}>Login</button>
            <button onClick={logout}>logout</button>
            {authContext.isAuth ? (
                <div>vous ête connecté</div>
            ) : (<div>connectez vous</div>)}
        </nav>
    )
}

export default withRouter(Header);