import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function UpdatePassword({toggle, setToggle}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)
    const [current, setCurrent] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const credentials = {username: decoded.user.username, password: current, newPassword: password, confirmedPassword: confirm}
        try{
            axios.put(`${import.meta.env.VITE_URI}/auth/${decoded.user._id}/updatepassword`, credentials, {headers: {'Content-Type': 'Application/json'}})
                .then((res) => {
                    if(res.data === 'password'){
                        toast.error('You typed the incorrect current password')
                    }else if(res.data === 'match'){
                        toast.error('your new password does not match')
                    } else{
                        navigate('/')
                        toast.success('You have successfully changed your password')
                    }
                })
        }catch(err){
            toast.error('There was an error updating your password')
            console.log(err)
        }
    }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Update Password</h1>
                <div className={`popup-update-container`}>
                  <form method="POST" onSubmit={handleSubmit} className='register-form'>
                  <input type="password" required name='current' id='currentPassword' className='currentPassword inputs' placeholder='CurrentPassword' minLength={6} value={current} onChange={(e) => setCurrent(e.target.value)}/>
                  <input type="password" required name='password' id='password' className='password inputs' placeholder='Password' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword inputs' placeholder='Confirm password' value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6}/>
                  <button className="user-follow">Update</button>
                  </form>
                </div>    
            </div>
        </div>
    </div>
  )
}

export default UpdatePassword