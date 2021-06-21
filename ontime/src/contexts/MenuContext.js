import * as React from "react";
import {Link} from "react-router-dom";
import "../styles/Menu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBroadcastTower, faCompactDisc, faHome, faMusic, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export const MenuContext = React.createContext([]);

export class MenuProvider extends React.PureComponent {

    state = {
        isOpen: false,
    };

    toggleShow = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render() {
        const {children} = this.props;
        const {isOpen} = this.state;


        return (
            <MenuContext.Provider value={
                {
                    menu: {
                        show: this.toggleShow,
                    }
                }
            }>

                <div id="menu" className={`${isOpen && 'active'}`}>
                    <div className="menu-box">
                        <nav>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faHome} size="xs" style={{color: '#46d2e9'}}/>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faBroadcastTower} size="xs" style={{color: '#46d2e9'}}/>
                                    <Link to="/trending">Trending</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faMusic} size="xs" style={{color: '#46d2e9'}}/>
                                    <Link to="/songs">Songs</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCompactDisc} size="xs" style={{color: '#46d2e9'}}/>
                                    <Link to="/albums">Albums</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faThumbsUp} size="xs" style={{color: '#46d2e9'}}/>
                                    <Link to="/favorites">Favorites</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {children}
            </MenuContext.Provider>
        );
    }
}

