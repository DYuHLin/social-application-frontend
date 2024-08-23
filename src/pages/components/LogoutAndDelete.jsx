import React, { useContext, useState } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import DeleteAccount from './EditDelete/DeleteAccount'
import { useNavigate } from 'react-router-dom'

function LogoutAndDelete({users}) {
    const {user, setUser} = useContext(AppContext)
    const decoded = jwtDecode(user)
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        try{
            axios.post(`${import.meta.env.VITE_URI}/auth/logout`, {username: decoded.user.username}, {headers: {'Content-Type': 'Application/json'}})
            toast.success('You have successfully logged out')
            setUser(false)
            navigate('/login')
        }catch(err){
            console.log(err)
            toast.error('There was an error logging out.')
        }
    }

    const follow = (id) => {
        axios.put(`${import.meta.env.VITE_URI}/auth/${decoded.user._id}/follow`, {followerId: id}, {headers:{'content-type': 'application/json'}})
            .then((res) => {
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
    <div className='btn-group'>
        {users._id !== decoded.user._id ? '' : <button className='user-follow' onClick={() => logout()}>Logout</button>}
        {users._id !== decoded.user._id ? '' : <button className='user-follow' onClick={() => setToggle(!toggle)}>Delete Account</button>}
        {users._id === decoded.user._id ? '' : <button className='user-follow' onClick={() => follow(users._id)}>{decoded.user.followers.some((ind) => ind.user._id === users._id) ? 'Following' : 'Follow'}</button>}
        <DeleteAccount toggle={toggle} setToggle={setToggle} />
    </div>
  )
}

export default LogoutAndDelete