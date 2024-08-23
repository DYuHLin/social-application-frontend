import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import LikeButton from './components/LikeButton'
import Comments from './components/Comments'
import LinkPreview from './components/LinkPreview'

function Post() {
  let { id } = useParams()
  const [post, setPost] = useState(false)
  const [filteredSearch, setFilteredSearch] = useState('new')
  const [comments, setComments] = useState([])
  const {user} = useContext(AppContext)
  const decoded = jwtDecode(user)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/posts/${id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPost(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  },[]) 
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
    <section>
      {!post ? '' : <div className="post-container">
      <div className="poster-info">
        <Link to={`/user/${post.user._id}`} className="poster">{post.user.username}</Link>
        <span className="post-date">{new Date(post.date).toLocaleString()}</span>
      </div>
      <div className="post-content">
        {
          post.text.trim() != '' ? <p>{post.text}</p> : ''
        }
        {
          post.link.trim() != '' ? <LinkPreview url={post.link} /> : ''
        }
        {
          post.video.trim() != '' ? <div className='vid-container'><video className='video' src={post.video} controls /></div> : ''
        }
        {
          post.youtube.trim() != '' ? <div dangerouslySetInnerHTML={{__html: post.youtube}}></div> : ''
        }
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
      </div>
    </div>}
    <div className="filter">
        <p className={`filter-option ${filteredSearch == 'new' ? 'selected' : ''}`} onClick={() => setFilteredSearch('new')}>New</p>
        <p className={`filter-option ${filteredSearch == 'old' ? 'selected' : ''}`} onClick={() => setFilteredSearch('old')}>Old</p>
        <p className={`filter-option ${filteredSearch == 'best' ? 'selected' : ''}`} onClick={() => setFilteredSearch('best')}>Best</p>
    </div>
    <Comments postId={id} userId={decoded.user._id} filteredSearch={filteredSearch}/>
    </section>
  )
}

export default Post