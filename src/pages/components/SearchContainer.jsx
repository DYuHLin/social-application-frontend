import React from 'react'
import { Link } from 'react-router-dom';

function SearchContainer({posts, comments, users, search}) {
  return (
    <>
        {posts === false ? '' : posts.length == 0 ? '' : posts.filter((item) => {
            return search.toLocaleLowerCase() === '' ? '' : item.text.toLocaleLowerCase().includes(search) || item.user.username.toLocaleLowerCase().includes(search)||
            item.link.toLocaleLowerCase().includes(search) || item.video.toLocaleLowerCase().includes(search);
            }).map((post, id) => {
            return(      
            <div className="searchBox" key={id}>
                <Link to={`/${post._id}`}>
                <p className='search-name'>{post.user.username}</p>
                {
                    post.text.trim() != '' ? <p>{post.text}</p> : ''
                }
                {
                    post.pics.length == 0 ? '' :<p>{post.pics.length} images</p>
                }
                {
                    post.link.trim() != '' ? <p>{post.link}</p> : ''
                }
                {
                    post.video.trim() != '' ? <p>A video</p> : ''
                } 
                {
                    post.youtube.trim() != '' ? <p>A Youtube video</p> : ''
                } 
                </Link>
            </div> 
            )
        }) 
        } 
        {comments === false ? '' : comments.length == 0 ? '' : comments.filter((item) => {
            return search.toLocaleLowerCase() === '' ? '' : item.text.toLocaleLowerCase().includes(search) || item.user.username.toLocaleLowerCase().includes(search)||
            item.link.toLocaleLowerCase().includes(search) || item.video.toLocaleLowerCase().includes(search);
            }).map((com, id) => {
            return(     
                <div className="searchBox" key={id}>
                    <Link to={`/${com._id}/comment`}>
                    <p className='search-name'>{com.user.username}</p>
                    {
                        com.text.trim() != '' ? <p>{com.text}</p> : ''
                    }
                    {
                        com.pics.length == 0 ? '' :<p>{com.pics.length} images</p>
                    }
                    {
                        com.link.trim() != '' ? <p>{com.link}</p> : ''
                    }
                    {
                        com.video.trim() != '' ? <p>A video</p> : ''
                    } 
                    {
                        com.youtube.trim() != '' ? <p>A Youtube video</p> : ''
                    } 
                    </Link>
                </div> 
            )
        }) 
        } 
        {users === false ? '' : users.length == 0 ? '' : users.filter((item) => {
            return search.toLocaleLowerCase() === '' ? '' : item.username.toLocaleLowerCase().includes(search)
            }).map((user, id) => {
            return(           
            <div className="searchBox" key={id}>
                <Link to={`/user/${user._id}`}>
                <p className='search-name'>{user.username}</p>
                </Link>
            </div> 
            )
        }) 
        }
    </>
  )
}

export default SearchContainer