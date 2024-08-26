import { createContext, useState, useEffect } from "react"
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { io } from "socket.io-client"

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const getInitialState = () => {
        const localUser = sessionStorage.getItem("APP_USER")
        return localUser ? JSON.parse(localUser) : false
    };
    const [user, setUser] = useState(getInitialState)
    const defaultPic = import.meta.env.VITE_PIC

    const ProtectedRoutes = () => {
        return(
            user === false ? (<Navigate to='/login' />) : user ? (<Outlet />) : ''
        )
    }

    useEffect(() => {
        sessionStorage.setItem('APP_USER', JSON.stringify(user));
    }, [user]);
    
    return(
        <AppContext.Provider value={{ProtectedRoutes, user, setUser, defaultPic}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext