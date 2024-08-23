import React from 'react'

function RefreshButton({setRefresh, posts}) {

  const backTop = () => {
    setRefresh(posts)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  
  return (
    <div className='refresher'>
    <button onClick={backTop} className='refresh-btn'>New Posts</button>
    </div>
  )
}

export default RefreshButton