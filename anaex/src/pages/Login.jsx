import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../services/auth';
import { setCreadential } from "../redux/slice/authSlice";

function Login() {
    const [form, setform] = useState({ email: '', password: '' });
    const Dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // here login method of service of auth 
            // it return the token and user data 
            const res = await login(form);

            // this responce is store in authslice and navigate to dashboard
            Dispatch(setCreadential(res));
            navigate('/dashboard');

        } catch (error) {
            console.log('error in login', error);
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-200 animate-fade-in"
            >
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Login
                </h2>

                <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="enter email"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                />

                <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                <input
                    name='password'
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="enter password"
                    className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-2 px-4 rounded-lg font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;
