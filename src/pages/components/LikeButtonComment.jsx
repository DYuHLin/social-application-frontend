import React, { useContext } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import {toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

function LikeButtonComment({commentId, likes, comment}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user.accessToken)
    const likeButton = () => {
        const decoded = jwtDecode(user.accessToken)
        try{
            axios.put(`${import.meta.env.VITE_URI}/comment/${commentId}/like`, {userId: decoded.user._id, liker: comment.user._id}, {headers: {'Content-Type': 'Application/json'}})
            console.log('liked')
        }catch(err){
            console.log(err)
            toast.error('There was an error liking this comment.')
        }
    }
  return (
    <>
    <button className='like-btn' onClick={likeButton}>{likes.length}{likes.some((like) => like.user === decoded.user._id) ? <i className='bx bx-heart heart'/> : <i className='bx bx-heart'/>}</button>
    </>
  )
}

export default LikeButtonComment