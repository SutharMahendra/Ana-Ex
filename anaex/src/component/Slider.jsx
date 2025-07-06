import { Link, useLocation } from "react-router-dom";

function Slider() {
    const location = useLocation();

    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: '📊' },
        { to: '/upload', label: 'Upload', icon: '⬆️' },
        { to: '/history', label: 'Charts', icon: '📈' },
        { to: '/insights', label: 'Insights', icon: '🔍' }
    ];

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-green-800 to-green-600 text-white p-6 shadow-xl flex flex-col">
            <h2 className="text-3xl font-extrabold mb-10 tracking-wider text-center">
                AnaEX
            </h2>

            <nav className="flex flex-col gap-4">
                {navItems.map((item, idx) => (
                    <Link
                        key={idx}
                        to={item.to}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                            ${location.pathname === item.to
                                ? 'bg-white text-green-700 font-semibold shadow'
                                : 'hover:bg-green-500 hover:bg-opacity-30'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-base">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto text-sm text-center text-green-200 opacity-70 pt-6">
                © {new Date().getFullYear()} AnaEX
            </div>
        </div>
    );
}

export default Slider;
