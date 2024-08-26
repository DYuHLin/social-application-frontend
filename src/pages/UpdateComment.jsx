import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import Emoji from './components/Emoji'
import { useParams, Link } from 'react-router-dom'
import UpdateCommentImages from './components/UpdateCommentImages'

function UpdateComment() {
  const [post, setPost] = useState(false)
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [tube, setTube] = useState('')
  const [link, setLink] = useState('')
  const [emojiToggle, setEmojiToggle] = useState(true)

  const {user} = useContext(AppContext)
  const navigate = useNavigate()
  let { id } = useParams()

  const handleSumbmit = (e) => {
    e.preventDefault()
    const decoded = jwtDecode(user.accessToken)
    const post = {userId: decoded.user._id, text: text, link: link, video: video, youtube: tube, pics: images}
    try{
      axios.put(`${import.meta.env.VITE_URI}/comment/${id}/update`, post, {headers: {'Content-Type': 'application/json'}})
      toast.success("You have updated this blog successfully");
      navigate('/');
    }catch(err){
      console.log(err)
      toast.error('There was an error making this post.')
    }
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URI}/comment/${id}/comment`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPost(res.data)
        setText(res.data.text)
        setVideo(res.data.video)
        setTube(res.data.youtube)
        setLink(res.data.link)
        setImages(res.data.pics)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this comment')
      })
  },[])

  return (
    <section>
        <h1>Comment</h1>
        <form method="POST" onSubmit={handleSumbmit} className='create-post-form'>

          <fieldset>
            <div className="emoji-container-btn">
            <faIcons.FaSmile className='emoji-icon' onClick={() => {setEmojiToggle(!emojiToggle)}}/>
            </div>
            <Emoji hidden = {emojiToggle} text={text} setText={setText} setEmoji={setEmojiToggle}/>
            <textarea className='post-text' name="text" id="text" cols="30" rows="5" placeholder='Write your post' value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </fieldset> 

          <input className='inputs' type="text" name="video" id="video" value={video} onChange={(e) => setVideo(e.target.value)}placeholder='Video link'/>
          <input className='inputs' type="text" name="tube" id="tube" value={tube} onChange={(e) => setTube(e.target.value)}placeholder='Youtube link'/>
          <input className='inputs' type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link'/>
          <UpdateCommentImages images={images} setImages={setImages} id={id}/>
          <button className="user-follow">Update</button>
        </form>
        <div className="post-links">
          <ul className='links'>
          </ul>
          </div>
    </section>
  )
}

export default UpdateComment