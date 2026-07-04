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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            
            <button 
                type='button' 
                onClick={hadndleGoogleLogin}
                className="w-full border border-gray-300 rounded-lg py-2 mb-4 flex items-center justify-center gap-2 hover:bg-gray-50"
            >
                Sign in with Google
            </button>

            <div className="text-center text-gray-400 mb-4">or</div>

            {error.message && (
                <p className="text-red-500 text-sm mb-3">
                    {error.statusCode} — {error.message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type='submit'
                    className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
                >
                    Login
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Account nahi h? 
                <span 
                    onClick={() => navigate('/signup')}
                    className="text-blue-500 cursor-pointer ml-1"
                >
                    Sign up
                </span>
            </p>

        </div>
    </div>
)
}

export default Login