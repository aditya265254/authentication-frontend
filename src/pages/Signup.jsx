import axios from 'axios'
import  {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, {fullName, email, password})
      navigate('/')
        } catch (error) {
    setError({
        message: error.response?.data?.message || "Something went wrong",
        statusCode: error.response?.data?.statusCode || error.response?.status
    })
}
  }

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

            {error.message && (
                <p className="text-red-500 text-sm mb-3">
                    {error.statusCode} — {error.message}
                </p>
            )}

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <input 
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                
                
                <button 
                    type='submit'
                    className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Already have account?
                <span 
                    onClick={() => navigate('/')}
                    className="text-blue-500 cursor-pointer ml-1"
                >
                    Login
                </span>
            </p>

        </div>
    </div>
)
}

export default Signup