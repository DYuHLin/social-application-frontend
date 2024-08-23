import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import DeletePost from './EditDelete/DeletePost'
import axios from 'axios'
import {toast} from 'react-toastify'
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'
import LinkPreview from './LinkPreview'

function UserPosts({loading, posts, filteredSearch}) {
  const [toggle, setToggle] = useState(false)
  const [post, setPost] = useState(false)
  const [comments, setComments] = useState([])
  const {user} = useContext(AppContext)
  const decoded = jwtDecode(user)

  const togglePopup = (id) => {
    setToggle(!toggle)
    axios.get(`${import.meta.env.VITE_URI}/posts/${id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPost(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/comment/comments`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComments(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[comments])
  
  return (
    <>
    {
        loading && posts.length === 0 ? <p>Loading the posts...</p> :
        posts.length === 0 ? <p>This user has no posts</p>:
        posts.sort((a, b) => {return filteredSearch == 'new' ? new Date(b.date) - new Date(a.date) : 
          filteredSearch == 'old' ? new Date(a.date) - new Date(b.date): 
          filteredSearch == 'best' ? b.likes.length - a.likes.length :''}).map((post, key) => {
          return(
          <div className="post-container" key={key}>
            <div className="poster-info">
              <Link to={`/user/${post.user._id}`} className="poster">{post.user.username}</Link>
              <span className="post-date">{new Date(post.date).toLocaleString()}</span>
            </div>
            <div className="post-content">
              {post.text.trim() != '' ? <p>{post.text}</p> : ''}
              { post.link.trim() != '' ? <LinkPreview url={post.link} /> : '' }
              {post.video.trim() != '' ? <div className='vid-container'><video className='video' src={post.video} controls /></div> : ''}
              {post.youtube.trim() != '' ? <div className='ytvid'  dangerouslySetInnerHTML={{__html: post.youtube}}></div> : ''}
              {
                post.pics.length != 0 ? 
                <section className="img-container">
                  <div className="slider-wrapper">
                    <div className="slider">
                      {post.pics.map((pic, id) => {
                        return(
                          <img id={`slide-${id}`} src={pic} alt="posts image" key={id}/>
                        )
                      })}
                    </div>
                    <div className="slider-nav">
                    {post.pics.map((pic, id) => {
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
              <LikeButton postId = {post._id} post={post}/>
              <div className="comment-count"><p>{comments.filter((com) => {return com.reply == post._id}).length}</p><Link to={`/${post._id}`}>Comments</Link></div>    
              {decoded.user._id == post.user._id ? <button className='user-follow' onClick={() => togglePopup(post._id)}>Delete</button> : ''}
              {decoded.user._id == post.user._id ? <Link to={`/${post._id}/update`}>Update</Link> : ''}
            </div>
          </div>
          )
        })
      } 
      <DeletePost toggle={toggle} setToggle={setToggle} post={post}/>
    </>
  )
}

export default UserPosts