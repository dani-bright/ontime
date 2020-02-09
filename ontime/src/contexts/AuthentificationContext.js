import * as React from "react";

export const AuthenticationContext = React.createContext({});

export class AuthenticationProvider extends React.PureComponent {

    state = {
        isAuth: false,
        user: {},
        favoriteList: []
    };

    setIsAuth = (isAuth) => {
        this.setState({
            isAuth,
        })
    };
    setUser = (user) => {
        this.setState({
            user,
        })
    };
    setFavorite = (favoriteList) => {
        this.setState({
            favoriteList
        })
    };

    render() {
        const {children} = this.props;
        const {isAuth, favoriteList, user} = this.state;


        return (
            <AuthenticationContext.Provider value={
                {
                    isAuth,
                    favoriteList,
                    user,
                    setIsAuth: this.setIsAuth,
                    setUser: this.setUser,
                    setFavorite: this.setFavorite,
                }
            }>
                {children}
            </AuthenticationContext.Provider>
        );
    }
}
