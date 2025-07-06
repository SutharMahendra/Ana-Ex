import { useState } from "react";
import { register } from "../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCreadential } from "../redux/slice/authSlice";

function Register() {

    const [form, setform] = useState({ name: '', email: '', password: '' });
    const Dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // use to prevent to autosave
        e.preventDefault();

        try {
            // register method of auth service is called with form data 
            // it return some responce that we store
            const res = await register(form);

            // responce data is store in authslice for perticular user
            Dispatch(setCreadential(res));
            navigate('/dashboard');
        } catch (error) {
            console.log("error in registeration", error);
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-200 animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Register
                </h2>

                <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                />

                <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                />

                <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                />

                <button className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-2 px-4 rounded-lg font-semibold">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Register;
