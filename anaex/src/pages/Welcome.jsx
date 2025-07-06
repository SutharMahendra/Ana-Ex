import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/gradient.css'; // 👈 import custom gradient animation CSS

function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            {/* Hero Section */}
            <header className="animated-gradient text-white py-24 px-4 text-center shadow-md">
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Welcome to <span className="text-yellow-300">AnaEX</span>
                </motion.h1>



                <motion.p
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    A smarter way to analyze, visualize, and predict your data.
                </motion.p>
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gray-50 text-center">
                <h2 className="text-3xl font-bold mb-8 text-green-800">Why AnaEX?</h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Feature icon="📊" title="Visualize Data" description="Generate beautiful 2D and 3D charts instantly." />
                    <Feature icon="🤖" title="AI Insights" description="Let AI find patterns, anomalies, and predictions." />
                    <Feature icon="🧠" title="Student Friendly" description="Designed with learning in mind—step by step." />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-green-700 text-white text-center">
                <h3 className="text-2xl font-semibold mb-3">Ready to get started?</h3>
                <p className="mb-6">Join AnaEX and explore your data in a smarter way.</p>
                <Link
                    to="/register"
                    className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Create Account
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} AnaEX. Built for learning. ❤️
            </footer>
        </div>
    );
}

function Feature({ icon, title, description }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="text-4xl mb-4">{icon}</div>
            <h4 className="text-xl font-semibold mb-2 text-green-800">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default LandingPage;
