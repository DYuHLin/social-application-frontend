import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import AppContext from '../context/AppContext'
import { jwtDecode } from 'jwt-decode'
import UpdatePassword from './components/UpdatePassword'
import UploadProfileImage from './components/UploadProfileImage'

function EditProfile() {
  const {user, setUser} = useContext(AppContext)
  const decoded = jwtDecode(user)
  const [toggle, setToggle] = useState(false)
  const [name, setName] = useState(decoded.user.name)
  const [surname, setSurname] = useState(decoded.user.surname)
  const [username, setUsername] = useState(decoded.user.username)
  const [bio, setBio] = useState(decoded.user.bio)
  const [email, setEmail] = useState(decoded.user.email)
  const [image, setImage] = useState(decoded.user.image)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedName = name.replace(/\s/g, '')
    const updatedSurname = surname.replace(/\s/g, '')
    const updatedUserame = username.replace(/\s/g, '')

    const register = {name: updatedName, surname: updatedSurname, username: updatedUserame, email, image: image}
    try{
      axios.put(`${import.meta.env.VITE_URI}/auth/${decoded.user._id}/updateaccount`, register, {headers: {'Content-Type': 'application/json'}})
      .then(res => res.data)
      .then(status => {
        if(status === 'failed'){
          setError('This username has been taken')
          toast.error('This username has been taken.')
        } else if(status == 'ok'){
          toast.success('You have sucessfully updated account.')
          setUser(false)
          navigate('/login')
        }
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <section>
    <h1>Edit Profile</h1>
        <form className='register-form' method="POST" onSubmit={handleSubmit}>
            <input type="text" required name='name' id='name' className='name inputs' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" required name='surname' id='surname' className='surname inputs' placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <input type="text" required name='username' id='username' className='username inputs' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <textarea className='post-text' name="text" id="text" cols="30" rows="3" placeholder='Bio (Optional)' value={bio} onChange={(e) => setBio(e.target.value)}></textarea> 
            <UploadProfileImage setImage={setImage}/>
            <button className="user-follow">Update</button>         
        </form>
        <p className="error">{error}</p> 
        <button onClick={() => setToggle(!toggle)} className="user-follow">Update Password</button>
        <UpdatePassword toggle={toggle} setToggle={setToggle} />
      </section>
  )
}

export default EditProfile