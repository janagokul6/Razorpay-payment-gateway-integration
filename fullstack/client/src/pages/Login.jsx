import React, { useState } from 'react';
import * as api from "../api"
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const [isVerified, setIsVerified] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.login(formData);
            setIsVerified(true)
        } catch (err) {
            alert(err?.message)
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md mx-auto mt-8">
            {isVerified ? <h1 className='text-center mt-[40%] pb-[40%] font-bold text-2xl'>Login successful, please check email for payment link</h1> : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`mt-1 p-2 block w-full rounded-md shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={`mt-1 p-2 block w-full rounded-md shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 }`}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                        <Link
                            to={"/"}
                            className="w-full flex justify-center py-2 px-4 border mt-4 hover:border-black  rounded-md shadow-sm text-sm font-medium"
                        >
                            Sign up
                        </Link>
                    </div>
                </form>
            )}
            </div>
        </div>
    )
}

export default Login