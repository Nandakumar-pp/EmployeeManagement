import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    axios.defaults.withCredentials=true
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/forgot-password',{email})
        .then(res=>{
            if(res.data.Status==="Success")
            {
                navigate('/login')
            }
        }).catch(err=>console.log(err))
        // setLoading(true);

        // // Simulate an API call to reset the password
        // setTimeout(() => {
        //     // For simplicity, assume any email is valid and password reset is successful
        //     setLoading(false);
        //     setMessage(`Password reset instructions sent to ${email}`);
        //     // Optionally navigate to login page after successful reset
        //     navigate('/login');
        // }, 2000);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Enter your email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 disabled:bg-teal-400"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>

            {message && (
                <div className="mt-4 text-center text-sm text-teal-600">
                    {message}
                </div>
            )}

            <div className="mt-4 text-center">
                <a href="/login" className="text-teal-600 hover:text-teal-700">
                    Back to Login
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;
