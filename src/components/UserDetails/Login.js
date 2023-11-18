import axios from 'axios';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import apiService from '../../utils/apiService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // Updated to use useNavigate
    const location=useLocation()
   const [auth, setAuth]=useAuth()
   const sumitHandler = async (e) => {
                e.preventDefault();
                const user = {
                email: email,
                password: password
                };
            
                try {
                const res = await apiService.post('/user/login', user);
            
                if (res.data && res.data.message) {
                    setError(false);
                    toast.success(res.data && res.data.message);
            
                    const token = res.data.token;
            
                    // Set the token in the Authorization header for immediate subsequent requests
                    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    console.log("the fron-end webtokken is:",apiService.defaults.headers);
                    setAuth({
                    ...auth,
                    user: res.data.user,
                    token: token,
                    });
            
                    localStorage.setItem("auth", JSON.stringify(res.data));
                    navigate(location.state || "/"); // Redirect to the main page after successful login
                }
                } catch (error) {
                console.log(error);
                setError(true);
                toast.error(error.message); // Updated to display the error message from the caught error
                }
            };
    return (
        <div className="bg-gray-100 h-screen w-screen flex justify-center items-center">
            <div className="bg-white px-6 py-3 rounded border w-64">
                <div className="flex flex-col items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 className="text-2xl font-bold">Login</h2>
                </div>
                <form action="#" method="POST" onSubmit={sumitHandler}>
                    <div className="flex flex-col my-2">
                        <label className="text-xs text-gray-400">Email</label>
                        <div className="text-xs text-red-400 flex justify-between items-center">
                            {error ? (
                                <>
                                    <span>
                                        <b>Error: </b>
                                        Invalid credentials!
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </>
                            ) : null}
                        </div>
                        <input
                            className="border rounded px-3 py-1 mt-2"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label className="text-xs text-gray-400">Password</label>
                        <input
                            className="border rounded px-3 py-1 mt-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center my-3">
                        <button className="my-3 py-1 w-full rounded bg-blue-600 text-blue-200" type="submit">
                            Submit
                        </button>
                        <p className="text-xs text-gray-500">
                            Forgot password ?
                            <Link to="/forget" className="font-bold text-gray-700 mr-2 ml-2">
                                Click here
                            </Link>
                            to reset your password.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
