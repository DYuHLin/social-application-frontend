import React, { useEffect, useState } from 'react'
import WriteComment from './WriteComment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LikeButtonComment from './LikeButtonComment'
import LinkPreview from './LinkPreview'

function Comments({postId, userId, filteredSearch}) {
  const [comments, setComments] = useState([])
  const [commentsC, setCommentsC] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/comment/${postId}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComments(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[comments])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/comment/comments`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setCommentsC(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[commentsC])

  return (
    <>
    <WriteComment postId={postId} userId={userId} setComments={setComments}/>
    <div className="post-container">
      {
      loading && comments.length === 0 ? <p>Loading the comments...</p> :
      comments.length === 0 ? <p>There are no comments right now</p>:
      comments.sort((a, b) => {return filteredSearch == 'new' ? new Date(b.date) - new Date(a.date) : 
        filteredSearch == 'old' ? new Date(a.date) - new Date(b.date): 
        filteredSearch == 'best' ? b.likes.length - a.likes.length :''}).map((comment, key) => {
        return(
        <div className="comment-container" key={key}>
          <div className="poster-info">
            <h4 className="poster">{comment.user.username}</h4>
            <span className="post-date">{new Date(comment.date).toLocaleString()}</span>
          </div>
          <div className="post-content">
            {
              comment.text.trim() != '' ? <p>{comment.text}</p> : ''
            }
            {
              comment.link.trim() != '' ? <LinkPreview url={comment.link} /> : ''
            }
            {
              comment.video.trim() != '' ? <div className='vid-container'><video className='video' src={comment.video} controls /></div> : ''
            }
            {
              comment.youtube.trim() != '' ? <div className='ytvid'  dangerouslySetInnerHTML={{__html: comment.youtube}}></div> : ''
            }
            {
              comment.pics.length != 0 ? 
              <section className="img-container">
                <div className="slider-wrapper">
                  <div className="slider">
                    {comment.pics.map((pic, id) => {
                      return(
                        <img id={`slide-${id}`} src={pic} alt="posts image" key={id}/>
                      )
                    })}
                  </div>
                  <div className="slider-nav">
                  {comment.pics.map((pic, id) => {
                      return(
                        <a href={`#slide-${id}`} key={id}></a>
                      )
                    })}
                  </div>
                </div>
            </section> : ''
            }
          </div>
          <div className="post-stuff">
            <LikeButtonComment commentId={comment._id} likes={comment.likes} comment={comment}/>
            <div className="comment-count"><p>{commentsC.filter((com) => {return com.reply == comment._id}).length}</p><Link to={`/${comment._id}/comment`}>Comments</Link></div>
          </div>
        </div>
        )
      })
      }  
    </div>
    </>
  )
}

export default Comments