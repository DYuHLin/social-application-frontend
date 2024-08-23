import React, { useContext } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import AppContext from '../../context/AppContext'

function NotificationPopup({toggle, setToggle, notifications, setNotifications}) {
    const {user, setUser} = useContext(AppContext)

    const clearNotifications = () => {
        try{
            axios.delete(`${import.meta.env.VITE_URI}/notifications/${jwtDecode(user).user._id}/delete`, {headers: {'Content-Type': 'Application/json'}})
            toast.success('You have successfully cleared notifications.')
            setNotifications([])
        }catch(err){
            console.log(err)
            toast.error('There was an error clearing notifications.')
        }
    }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Notifications</h1>
                <div className={`popup-fow-container`}>
                <button className='clear-btn' onClick={() => clearNotifications()}>Clear Notifications</button>
                    {notifications.length == 0 ? <p>You do not have notifications</p> : notifications.map((noti, key) => {
                        return(
                            <div className="noti" key={key}>
                                <p>{noti.user.username + ' ' + noti.text}</p>
                                <span>{new Date(noti.date).toLocaleString()}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotificationPopup