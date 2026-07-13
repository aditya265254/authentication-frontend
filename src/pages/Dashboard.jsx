import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate('/')
  }
useEffect(() => {
  
    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('token')
    const urlUser = urlParams.get('user')
    
    if (urlToken) {
        localStorage.setItem("token", urlToken)
        localStorage.setItem("user", urlUser)
    }
    
   
    const token = localStorage.getItem("token")
    if (!token) {
        navigate('/')
    }
    
    const user =  JSON.parse(localStorage.getItem("user"))
    setUser(user)
}, [])

return (
    <div className="min-h-screen bg-gray-100">
        
        <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
                Logout
            </button>
        </div>

        <div className="flex items-center justify-center mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1>{user?.fullName}</h1>
                <h2>{user?.email}</h2>
            </div>
        </div>

    </div>
)
};

export default Dashboard;
