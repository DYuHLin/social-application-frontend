import React, { useContext } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import {toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { CiHeart } from "react-icons/ci"

function LikeButton({postId, post}) {

    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

    const likeButton = () => {
        const decoded = jwtDecode(user)
        try{
            axios.put(`${import.meta.env.VITE_URI}/posts/${postId}/like`, {userId: decoded.user._id, yourId: post.user._id}, {headers: {'Content-Type': 'Application/json'}})
            console.log('liked')
        }catch(err){
            console.log(err)
            toast.error('There was an error liking this post.')
        }
    }

  return (
    <>
    <div className='like-btn' onClick={likeButton}><p>{post.likes.length}</p>{post.likes.some((like) => like.user === decoded.user._id) ? <i className='bx bx-heart heart'/> : <i className='bx bx-heart'/>}</div>
    </>
  )
}

export default LikeButton