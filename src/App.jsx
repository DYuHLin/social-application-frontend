import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/components/Navbar'
import './assets/style.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

axios.defaults.withCredentials = true

function App() {
  return (
    <div className="root-layout">
      <Navbar />
      <main>
        <Outlet/>
      </main>
        <ToastContainer position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Zoom/>
    </div>
  )
}

export default App
