import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import axios from 'axios'
import LinkPreview from './LinkPreview'
import CommentLikes from './CommentLikes'

function UserLikes({id, filteredSearch}) {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/user/likes/${id}`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this users posts')
      })
  },[id])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/comment/comments`, {headers: {'Content-Type': 'application/json'}})
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
        loading && posts.length === 0 ? <p>Loading the likes...</p> :
        posts.length === 0 ? <p>This user has no likes</p>:
        posts.sort((a, b) => {return filteredSearch == 'new' ? new Date(b.date) - new Date(a.date) : 
          filteredSearch == 'old' ? new Date(a.date) - new Date(b.date): 
          filteredSearch == 'best' ? b.likes.length - a.likes.length :''}).map((post, key) => {
          return(
          <div className="post-container" key={key}>
            <p>Post</p>
            <div className="poster-info">
              <Link to={`/user/${post.user._id}`} className="poster">{post.user.username}</Link>
              <span className="post-date">{new Date(post.date).toLocaleString()}</span>
            </div>
            <div className="post-content">
              {post.text.trim() != '' ? <p>{post.text}</p> : ''}
              {post.link.trim() != '' ? <LinkPreview url={post.link} /> : ''}
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
            </div>
          </div>
          )
        })
      } 
      <CommentLikes id={id} filteredSearch={filteredSearch}/>
    </>
  )
}

export default UserLikes