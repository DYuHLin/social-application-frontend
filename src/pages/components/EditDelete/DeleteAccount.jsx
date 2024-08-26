import { jwtDecode } from 'jwt-decode'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function DeleteAccount({toggle, setToggle}) {
    const {user, setUser} = useContext(AppContext)
    const decoded = jwtDecode(user.accessToken)
    const navigate = useNavigate()

    const deleteAccount = () => {
        try{
            axios.delete(`${import.meta.env.VITE_URI}/auth/${decoded.user._id}/deleteaccount`, {headers: {'Content-Type': 'Application/json'}})
            toast.success('You have successfully deleted your account')
            setUser(false)
            navigate('/login')
        }catch(err){
            console.log(err)
            toast.error('There was an error deleting your account.')
        }
    }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Delete Account</h1>
                <div className={`popup-fow-container`}>
                  <p>Are you sure you want to delete your account?</p>
                  <span>All your posts and comments will be deleted as well</span>
                </div>
                <button className="user-follow" onClick={() => deleteAccount(decoded.user._id)}>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteAccount