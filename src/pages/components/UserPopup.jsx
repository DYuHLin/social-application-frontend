import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
function UserPopup() {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState('')
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

    useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/auth/getusers`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
      })
    },[users])

    const follow = (userId) => {
      axios.put(`${import.meta.env.VITE_URI}/auth/${decoded.user._id}/follow`, {followerId: userId}, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setStatus(res.data)
        if(res.data === 'deleted'){
          toast.success('You have unfollwed this user')
        } else if(res.data === 'ok'){
          toast.success('You have followed this user')
        }
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error following this user')
      })
    }
    
  return (
    <>
        {
        users.map((user, key) => {
            return(  
              <div className="user-pane-info" key={key}>
                <Link to={`/user/${user._id}`}>
                  <div className="user-detail">
                    <div className="img-round">
                      <img src={user.image} alt="user's image" className='profile-img'/>
                    </div>   
                      <p>{user.username}</p>
                  </div>
                  </Link>
                  {
                    decoded.user.followers.some((ind) => ind.user._id === user._id) ? <button onClick={() => follow(user._id)} className="user-follow following">Following</button>: 
                    <button onClick={() => follow(user._id)} className="user-follow">Follow</button>
                    }
              </div>
            )
        })
        }
    </>
  )
}

export default UserPopup