import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        const urlUser = urlParams.get('user');
        
        if (urlToken && urlUser) {
            try {
                const decodedUser = decodeURIComponent(urlUser);
                localStorage.setItem("token", urlToken);
                localStorage.setItem("user", decodedUser);
                
                const parsedUser = JSON.parse(decodedUser);
                localStorage.setItem("role", parsedUser.role);
                
                if (parsedUser.role === "admin") {
                    window.location.href = "/admin/dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
                return;
            } catch (e) {
                console.error("User data parse error:", e);
            }
        }
        
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
            return;
        }
        
        const savedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        if (savedUser?.role === "admin") {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

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
                    <h1 className="text-xl font-semibold">{user?.fullName}</h1>
                    <h2 className="text-gray-500">{user?.email}</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;