import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verifying your email, please wait...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyUserEmail = async () => {
            // 1. URL se token nikalo (?token=XYZ)
            const token = searchParams.get("token");

            if (!token) {
                setError("Invalid link. Token is missing.");
                setStatus("");
                return;
            }

            try {
              
                const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
                const response = await axios.get(`${backendUrl}/api/auth/verify-email?token=${token}`);

                if (response.data.success) {
                    setStatus("Email Verified Successfully! Redirecting to login...");
                    
               
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Verification failed. Link might be expired.");
                setStatus("");
            }
        };

        verifyUserEmail();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
                
                {status && <p className="text-blue-600 font-medium">{status}</p>}
                
                {error && (
                    <div>
                        <p className="text-red-500 font-medium mb-4">{error}</p>
                        <button 
                            onClick={() => navigate("/")} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;