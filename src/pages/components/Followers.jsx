import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Followers({toggle, setToggle, users, id}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)
    const [followers, setFollowers] = useState([])
    const [hidden, setHidden] = useState(false)

useEffect(() => {
    axios.get(`http://localhost:3000/api/auth/${id}/followers`, {headers:{'content-type': 'application/json'}})
        .then((res) => {
        setFollowers(res.data)
        }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
        })
    },[id])

const follow = (userId) => {
    axios.put(`http://localhost:3000/api/auth/${decoded.user._id}/follow`, {followerId: userId}, {headers:{'content-type': 'application/json'}})
    .then((res) => {
        setStatus(res.data)
        if(res.data === 'deleted'){
        toast.success('You have unfollwed this user')
        } else if(res.data === 'ok'){
        toast.success('You have followed this user')
        }
    }).catch((err) => {
        console.log(err)
        toast.error('There was an error following this user')
    })
    }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <button className='follow-btn' onClick={() => setHidden(!hidden)}>{hidden == 'followers'? 'Following' : 'Followers'}</button>
                <div className={`popup-fow-container ${hidden == true ? 'hidden' : ''}`}>
                    <p className={`follow-count ${hidden == true ? 'hidden' : ''}`}>Following: {!users ? '' : users.followers.length}</p>
                {   !users ? '' : users.followers.length === 0 ? <p>Not following anyone...</p> :
                    users.followers.map((fow, key) => {
                        return(
                            <div className={`user-pane-info ${hidden == true ? 'hidden' : ''}`} key={key}>
                                <div className="user-detail">
                                <div className="img-round2">
                                    <img src={fow.user.image} alt="user's image" className='profile-img'/>
                                </div>   
                                    <p>{fow.user.username}</p>
                                </div>
                                <button className="user-follow" onClick={() => follow(fow.user._id)}>Following</button>
                            </div>
                        )
                    })
                }
                </div>           

                <div className={`popup-fow-container ${hidden == false ? 'hidden' : ''}`}>
                <p className={`follow-count ${hidden == false ? 'hidden' : ''}`}>Followers: {!followers ? '' : followers.length}</p>
                {followers.length === 0 ? <p>No follwers...</p> :
                followers.map((fow, key) => {
                    return(
                        <div className={`user-pane-info ${hidden == false ? 'hidden' : ''}`} key={key}>
                            <div className="user-detail">
                            <div className="img-round2">
                                <img src={fow.image} alt="user's image" className='profile-img'/>
                            </div>   
                                <p>{fow.username}</p>
                            </div>
                            {followers.filter((p) => p.user === decoded.user._id) ?
                            <button onClick={() => follow(fow._id)} className="user-follow">Following</button> : <button onClick={() => follow(fow._id)} className="user-follow">Follow</button>}
                        </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Followers