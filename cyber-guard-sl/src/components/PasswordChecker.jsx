import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const calculateStrength = (password) => {
    if (!password) return { score: 0, text: 'WAITING FOR INPUT...', color: 'border-cyber-gray', time: '∞' };

    let score = 0;
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score < 3) return { score, text: 'CRITICAL VULNERABILITY DETECTED', color: 'border-red-600', time: 'INSTANTLY' };
    if (score < 5) return { score, text: 'MODERATE ENCRYPTION', color: 'border-yellow-500', time: '3 DAYS' };
    return { score, text: 'ENCRYPTION SECURE', color: 'border-cyber-green', time: '400 CENTURIES' };
};

const PasswordChecker = () => {
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(calculateStrength(''));
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        setIsCalculating(true);
        const timeout = setTimeout(() => {
            setResult(calculateStrength(password));
            setIsCalculating(false);
        }, 400); // Simulate calculation delay
        return () => clearTimeout(timeout);
    }, [password]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-full max-w-2xl bg-black/80 backdrop-blur-md border-2 ${result.color} p-8 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden`}
            >
                {/* Scanline for the card */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] opacity-20"></div>

                <h2 className="text-3xl font-mono text-white mb-8 border-b border-gray-700 pb-4">
                    &gt; PASSWORD_ENTROPY_ANALYZER
                </h2>

                <div className="relative mb-8">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-green font-mono text-xl">{'>'}</span>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-gray-700 rounded p-4 pl-10 text-xl font-mono text-white focus:outline-none focus:border-cyber-green focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                        placeholder="Enter Password_"
                    />
                </div>

                <div className="space-y-4 font-mono">
                    <div className="flex justify-between items-center text-gray-400">
                        <span>STATUS:</span>
                        {isCalculating ? (
                            <span className="text-yellow-500 animate-pulse">* CALCULATING HASH ENTROPY... *</span>
                        ) : (
                            <span className={`${result.color.replace('border-', 'text-')} font-bold`}>{result.text}</span>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-gray-400">
                        <span>ESTIMATED CRACK TIME:</span>
                        <span className={`${result.color.replace('border-', 'text-')} font-bold text-xl`}>
                            {isCalculating ? '...' : result.time}
                        </span>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-2 right-4 text-xs text-gray-600 font-mono">
                    SYS_V.1.0.4
                </div>
            </motion.div>
        </div>
    );
};

export default PasswordChecker;
