import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';

function Header() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log('error in logout user', error);
        }
    };

    return (
        <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md border-b border-gray-200">
            <h1 className="text-2xl font-bold text-green-700 tracking-wide">
                Welcome, {user?.name || 'Dear'}!
            </h1>
            <button
                onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 rounded-lg font-medium"
            >
                Logout
            </button>
        </header>
    );
}

export default Header;
