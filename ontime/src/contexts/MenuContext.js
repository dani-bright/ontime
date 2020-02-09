import * as React from "react";
import {Link} from "react-router-dom";
import "../styles/Menu.css"

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
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/trending">Trending</Link></li>
                                <li><Link to="/songs">Top Songs</Link></li>
                                <li><Link to="/albums">Top almbums</Link></li>
                            </ul>
                            <ul>
                                <li><Link to="/favorites">Favorites</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {children}
            </MenuContext.Provider>
        );
    }
}

