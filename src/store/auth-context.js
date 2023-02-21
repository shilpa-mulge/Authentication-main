import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLogedin: false,
    login: (token) => { },
    logout: () => { }
})


export const AuthContextProvider = (props) => {
    const intialToken = localStorage.getItem('token');
    const [token, setToken] = useState(intialToken);
    const userLoggedIn = !!token;
    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
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