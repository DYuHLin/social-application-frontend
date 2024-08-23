import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function DeletePost({toggle, setToggle, post}) {
  const navigate = useNavigate()

  const deletePost = (id) => {
    try{
      axios.delete(`${import.meta.env.VITE_URI}/posts/${id}/delete`, {headers: {'Content-Type': 'Application/json'}})
      toast.success('This post was deleted successfully')
      setToggle(!toggle)
      navigate('/')

  }catch(err){
      console.log(err)
      toast.error('There was an error deleting this post.')
  }
  }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            {post === false ? '' :<div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Delete Post</h1>
                <div className={`popup-fow-container`}>
                  <p>Are you sure you want to delete this post?</p>
                  {
                    post.text.trim() != '' ? <p>{post.text}</p> : ''
                  }
                  {
                    post.pics.length == 0 ? '' :<p>{post.pics.length} images</p>
                  }
                  {
                    post.link.trim() != '' ? <a>{post.link}</a> : ''
                  }
                  {
                    post.video.trim() != '' ? <p>Video</p> : ''
                  } 
                </div>
                <button className="user-follow" onClick={() => deletePost(post._id)}>Delete Post</button>
            </div>}
        </div>
    </div>
  )
}

export default DeletePost