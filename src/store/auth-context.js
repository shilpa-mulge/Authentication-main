import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLogedin: false,
    login: (token) => { },
    logout: () => { }
})


export const AuthContextProvider = (props) => {
    const item = localStorage.getItem('token');
    let intialToken = JSON.parse(item);
    const now = new Date();
    if (intialToken !== null && now.getTime() > intialToken.expiry) {
        localStorage.removeItem('token')
        intialToken = null;
    }
    const [token, setToken] = useState(intialToken);
    const userLoggedIn = !!token;
    const loginHandler = (token) => {
        const item = {
            value: token,
            expiry: new Date().getTime() + 1 * 60000
        }
        setToken(token)
        localStorage.setItem('token', JSON.stringify(item))
    }
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }
    const contextValue = {
        token: token,
        isLogedin: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;