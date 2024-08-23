import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import SearchContainer from './SearchContainer'
import UserPopup from './UserPopup'

function SearchBar({toggle, setToggle}) {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [use, setUse] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/posts/`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the posts')
      })
    },[posts])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/auth/getusers`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
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
    },[])
  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <button className="follow-btn" onClick={() => setUse(!use)}>{!use ? 'Search' : 'Users'}</button>
                <div>
                  {use == false ? <><input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search posts, comments, etc' className='searchbar'/>   
                  <div className="results">
                    <SearchContainer posts={posts} comments={comments} search={search} users={users} />
                  </div> </>: <UserPopup /> 
                  }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar