import LikeButton from './LikeButton'
import React, { useContext } from 'react'
import { FaRegComment } from "react-icons/fa"
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
import LinkPreview from './LinkPreview'

function Posts({posts, loading, regular, comments, filteredSearch}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

  return (
    <>
        {
        loading && posts.length === 0 ? <p>Loading the posts...</p> :
        posts.length === 0 ? <p>There are no posts right now</p>:
        posts.sort((a, b) => {return filteredSearch == 'new' ? new Date(b.date) - new Date(a.date) : 
          filteredSearch == 'old' ? new Date(a.date) - new Date(b.date): 
          filteredSearch == 'best' ? b.likes.length - a.likes.length :''}).map((post, key) => {
          return(
          <div className={`post-container ${!regular ? 'hidden' : ''}`} key={key}>
            <div className="poster-info">
              <Link to={`/user/${post.user._id}`} className="poster">{post.user.username}</Link>
              <span className="post-date">{new Date(post.date).toLocaleString()}</span>
            </div>
            <div className="post-content">
              {post.text.trim() != '' ? <p>{post.text}</p> : ''}
              {post.link.trim() != '' ? <LinkPreview url={post.link} /> : ''}
              {post.video.trim() != '' ? <div className='vid-container'><video className='video' src={post.video} controls /> </div>: ''}
              {post.youtube.trim() != '' ? <div className='ytvid' dangerouslySetInnerHTML={{__html: post.youtube}}></div> : ''}
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
              <div className='comment-count'><p>{comments.filter((com) => {return com.reply == post._id}).length}</p><Link className='link-comment' to={`/${post._id}`}><FaRegComment className='comment-icons'/></Link></div>
            </div>
          </div>
          )
        })
      } 
    </>
  )
}

export default Posts