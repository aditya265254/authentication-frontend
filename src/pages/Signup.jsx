import axios from 'axios'
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://authentication-bakend-rclb.onrender.com/api/auth/signup", {fullName, email, password})
      navigate('/')
        } catch (error) {
    setError({
        message: error.response?.data?.message || "Something went wrong",
        statusCode: error.response?.data?.statusCode || error.response?.status
    })
}
  }

  return (
    <div>
      <h1>SignUp</h1>
      {error.message && <p>{error.statusCode} — {error.message}</p>}
      <form onSubmit={handleSignUp}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
        <label htmlFor="email">Email:</label>
        <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup