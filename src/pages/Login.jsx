import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await  axios.post("https://authentication-bakend-rclb.onrender.com/api/auth/login", {email, password})
      localStorage.setItem("token", response.data.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.data.user))
      navigate('/dashboard')
    } catch (error) {
    setError({
        message: error.response?.data?.message || "Something went wrong",
        statusCode: error.response?.data?.statusCode || error.response?.status
    })
}
  }

  const hadndleGoogleLogin = () => {
    window.location.href  = 'https://authentication-bakend-rclb.onrender.com/api/auth/google'
  }

  return (
    <div >
       <button type='button' onClick={hadndleGoogleLogin} >Sigin with google </button>
     {error.message && <p>{error.statusCode} — {error.message}</p>}  
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">userName or email</label>
        <input type="text" id='user' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">password</label>
        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' >login</button>
      </form>
    </div>
  )
}

export default Login