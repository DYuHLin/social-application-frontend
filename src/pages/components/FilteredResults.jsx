import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import LikeButton from './LikeButton'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import LinkPreview from './LinkPreview'

function FilteredResults({loading, filtered, filteredResults, filteredSearch}) {
  const {user, setUser} = useContext(AppContext)
  const decoded = jwtDecode(user)

  return (
    <>
    {
        loading && filteredResults.length === 0 ? <p>Loading the posts...</p> :
        filteredResults.length === 0 ? <p className={`${!filtered ? 'hidden' : ''}`}>There are no posts right now</p>:
        filteredResults.sort((a, b) => {return filteredSearch == 'new' ? new Date(b.date) - new Date(a.date) : 
          filteredSearch == 'old' ? new Date(a.date) - new Date(b.date): 
          filteredSearch == 'best' ? b.likes.length - a.likes.length :''}).map((post, key) => {
          return(
          <div className={`post-container ${!filtered ? 'hidden' : ''}`} key={key}>
            <div className="poster-info">
              <Link to={`/user/${post.user._id}`} className="poster">{post.user.username}</Link>
              <span className="post-date">{new Date(post.date).toLocaleString()}</span>
            </div>
            <div className="post-content">
              {post.text.trim() != '' ? <p>{post.text}</p> : ''}
              {post.link.trim() != '' ? <LinkPreview url={post.link} /> : ''}
              {post.video.trim() != '' ? <div className='vid-container'><video className='video' src={post.video} controls /></div>: ''}
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
              <Link to={`/${post._id}`}>Comments</Link>
            </div>
          </div>
          )
        })
      } 
    </>
  )
}

export default FilteredResults