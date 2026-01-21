import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ setCurrentView }) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-black/50 border-b border-cyber-green"
        >
            <div
                className="text-2xl font-bold font-mono text-cyber-green tracking-wider glitch-effect cursor-pointer"
                onClick={() => setCurrentView('dashboard')}
            >
                CyberGuard SL
            </div>
            <div className="flex space-x-8">
                <button
                    onClick={() => setCurrentView('dashboard')}
                    className="text-gray-300 hover:text-cyber-green font-mono transition-colors duration-300 text-sm uppercase tracking-widest hover:underline decoration-cyber-green decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer"
                >
                    Live Map
                </button>
                <button
                    onClick={() => setCurrentView('scam-feed')}
                    className="text-gray-300 hover:text-cyber-green font-mono transition-colors duration-300 text-sm uppercase tracking-widest hover:underline decoration-cyber-green decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer">
                    Scam Alerts
                </button>
                <button
                    onClick={() => setCurrentView('email-check')}
                    className="text-gray-300 hover:text-cyber-green font-mono transition-colors duration-300 text-sm uppercase tracking-widest hover:underline decoration-cyber-green decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer">
                    Breach Scan
                </button>
                <button
                    onClick={() => setCurrentView('password-tool')}
                    className="text-gray-300 hover:text-cyber-green font-mono transition-colors duration-300 text-sm uppercase tracking-widest hover:underline decoration-cyber-green decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer"
                >
                    Password Tool
                </button>
                <button
                    onClick={() => setCurrentView('report')}
                    className="text-red-500 hover:text-white font-mono transition-all duration-300 text-sm uppercase tracking-widest border border-red-500 hover:bg-red-500 px-4 py-1 rounded cursor-pointer"
                >
                    Report
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
