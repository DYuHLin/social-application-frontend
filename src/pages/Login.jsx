import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import AppContext from '../context/AppContext'
import Cookies from 'js-cookie'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {user, setUser} = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const login = {username: username, password: password}
    try{
      const res = await axios.post(`${import.meta.env.VITE_URI}/auth/login`, login, {headers:{'content-type': 'application/json'}})
      if(res.data == 'username'){
        setError('Your username or password is incorrect.')
      }else if(res.data == 'password'){
        setError('Your username or password is incorrect.')
      } else {
        toast.success('You have successfully logged in.')
        setUser(res.data)
        navigate('/')
      }
    }catch(err){
      console.log(err)
    }
  }

  const guest = async () => {
    const login = {username: 'guest', password: 'guest1234'}
    try{
      const res = await axios.post(`${import.meta.env.VITE_URI}/auth/login`, login, {headers:{'content-type': 'application/json'}})
      if(res.data == 'username'){
        setError('Your username or password is incorrect.')
      }else if(res.data == 'password'){
        setError('Your username or password is incorrect.')
      } else {
        toast.success('You have successfully logged in.')
        setUser(res.data)
        navigate('/')
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <section>
        <h1>Login</h1>
        <form method="POST" className='login-form' onSubmit={handleSubmit}>
          <input type="text" required name='username' id='username' className='username inputs' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" required name='password' id='password' className='password inputs' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button className="user-follow">Login</button>
        </form>
        <p className="error">{error}</p> 
        <Link to={"/register"} className="link">Register</Link>
        <p className='guest' onClick={guest}>Sign in as guest</p>
      </section>
  )
}

export default Login