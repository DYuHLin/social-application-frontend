import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import Users from './components/Users'
import FilteredResults from './components/FilteredResults'
import { jwtDecode } from 'jwt-decode'
import Posts from './components/Posts'
import CreatePost from './CreatePost'
import { io } from 'socket.io-client'
import RefreshButton from './components/RefreshButton'

const socket = io.connect(import.meta.env.VITE_API)

function Home() {
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [regular, setRegular] = useState(true)
  const [filtered, setFiltered] = useState(false)
  const [filteredSearch, setFilteredSearch] = useState('new')
  const [filteredResults, setFilteredResults] = useState([])
  const {user, setUser} = useContext(AppContext)
  const decoded = jwtDecode(user.accessToken)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/posts/`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
        setFilteredResults(res.data.filter((post) => decoded.user.followers.some((userId) => userId.user._id === post.user._id)))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the posts')
      })
  },[posts])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/posts/`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {setRefresh(res.data)
      })
      .catch((err) => {
        console.log(err)
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
    {posts.length === refresh.length ? '' : <RefreshButton setRefresh={setRefresh} posts={posts} />}
    <CreatePost socket={socket} setRefresh={setRefresh} setPosts={setPosts}/>
    <div className="see-posts">
      <p onClick={() => {setRegular(true); setFiltered(false)}} className='filter-link'>All</p> <p onClick={() => {setRegular(false); setFiltered(true)}} className='filter-link'>Following</p>
    </div>
    <div className="filter">
        <p className={`filter-option ${filteredSearch == 'new' ? 'selected' : ''}`} onClick={() => setFilteredSearch('new')}>New</p>
        <p className={`filter-option ${filteredSearch == 'old' ? 'selected' : ''}`} onClick={() => setFilteredSearch('old')}>Old</p>
        <p className={`filter-option ${filteredSearch == 'best' ? 'selected' : ''}`} onClick={() => setFilteredSearch('best')}>Best</p>
      </div>
    <div className="home-container">
      <div className="home-posts">
      <Posts posts={posts} loading={loading} regular={regular} comments={comments} filteredSearch={filteredSearch}/>
      <FilteredResults posts={posts} loading={loading} filtered={filtered} filteredResults={filteredResults} filteredSearch={filteredSearch}/>
      </div>
      <Users />
    </div>
    </section>
  )
}

export default Home