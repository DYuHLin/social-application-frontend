import { createContext, useState, useEffect } from "react"
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { io } from "socket.io-client"

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const getInitialState = () => {
        const localUser = Cookies.get('tokens')
        return localUser ? localUser : false
    };
    const [user, setUser] = useState(getInitialState)
    const defaultPic = import.meta.env.VITE_PIC

    const ProtectedRoutes = () => {
        return(
            user === false ? (<Navigate to='/login' />) : user ? (<Outlet />) : ''
        )
    }
    
    return(
        <AppContext.Provider value={{ProtectedRoutes, user, setUser, defaultPic}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext