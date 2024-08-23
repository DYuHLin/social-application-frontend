import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function DeleteComment({toggle, setToggle, comment}) {

    const deleteComment = (id) => {
        try{
          axios.delete(`${import.meta.env.VITE_URI}/comment/${id}/delete`, {headers: {'Content-Type': 'Application/json'}})
          toast.success('This comment was deleted successfully')
          setToggle(!toggle)
      }catch(err){
          console.log(err)
          toast.error('There was an error deleting this comment.')
      }
      }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            {comment === false ? '' :<div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Delete Comment</h1>
                <div className={`popup-fow-container`}>
                  <p>Are you sure you want to delete this Comment?</p>
                  {
                    comment.text.trim() != '' ? <p>{comment.text}</p> : ''
                  }
                  {
                    comment.pics.length == 0 ? '' :<p>{comment.pics.length} images</p>
                  }
                  {
                    comment.link.trim() != '' ? <a>{comment.link}</a> : ''
                  }
                  {
                    comment.video.trim() != '' ? <video>{comment.video}</video> : ''
                  } 
                </div>
                <button className="user-follow" onClick={() => deleteComment(comment._id)}>Delete Comment</button>
            </div>}
        </div>
    </div>
  )
}

export default DeleteComment