import React, { useContext, useEffect, useRef, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import SearchBar from './SearchBar'
import axios from 'axios'
import {toast} from 'react-toastify'
import NotificationPopup from './NotificationPopup'

function Navbar() {
  const {user, setUser} = useContext(AppContext)
  const [notifications, setNotifications] = useState([])
  const [toggle2, setToggle2] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [menu, setMenu] = useState(false)

  const navigate = useNavigate()

    const notifcationPop = () => {
      if(user === false){
        return
      } else {
        axios.get(`${import.meta.env.VITE_URI}/notifications/${jwtDecode(user).user._id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setNotifications(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the notifications')
      })
      }
    }

  return (
    <>
    <header>
      <nav>
        <h1 className='project-title' onClick={() => navigate('/')}>Clones</h1>

        <ul className={`dropdown ${menu == false ? '' : !user ? '' : user !== false && !menu ? '' : 'dropdown-active'}`}>
            <li onClick={() => navigate(`user/${jwtDecode(user).user._id}`)}>Profile</li>
            <li onClick={() => {setToggle2(true); notifcationPop();}}>Notifications</li>
            <li onClick={() => {setToggle(true);}}>Search</li>
          </ul>

          <div className="app-links">
          {!user ? '' :<div className='profile-link'>
          <img src={jwtDecode(user).user.image} alt="user's image" className='profile-img' onClick={() => setMenu(!menu)}/>
          </div>}           
        </div>
      </nav>
    </header>
      <NotificationPopup toggle={toggle2} setToggle={setToggle2} notifications={notifications} setNotifications={setNotifications}/>
      {!user ? '' : <SearchBar toggle={toggle} setToggle={setToggle}/>}
    </>
  )
}

export default Navbar