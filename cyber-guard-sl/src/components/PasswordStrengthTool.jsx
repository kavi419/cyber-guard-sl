import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const calculateStrength = (password) => {
    if (!password) return {
        score: 0,
        text: 'WAITING FOR INPUT...',
        color: 'bg-gray-800',
        textColor: 'text-gray-500',
        borderColor: 'border-gray-800',
        width: '0%',
        time: '∞'
    };

    let score = 0;
    // Length checks
    if (password.length > 8) score += 20;
    if (password.length > 12) score += 20;

    // Character checks
    if (/[A-Z]/.test(password)) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    // Cap score at 100
    score = Math.min(100, score);

    // Determine properties based on score
    if (score < 40) {
        return {
            score,
            text: 'WEAK // VULNERABLE',
            color: 'bg-red-600',
            textColor: 'text-red-500',
            borderColor: 'border-red-600',
            width: `${score}%`,
            time: 'INSTANTLY'
        };
    } else if (score < 80) {
        return {
            score,
            text: 'MEDIUM // DECRYPTABLE',
            color: 'bg-yellow-500',
            textColor: 'text-yellow-500',
            borderColor: 'border-yellow-500',
            width: `${score}%`,
            time: '3 DAYS'
        };
    } else {
        return {
            score,
            text: 'STRONG // SECURE',
            color: 'bg-cyber-green',
            textColor: 'text-cyber-green',
            borderColor: 'border-cyber-green',
            width: `${score}%`,
            time: '400 CENTURIES'
        };
    }
};

const PasswordStrengthTool = () => {
    const [password, setPassword] = useState('');
    const [analysis, setAnalysis] = useState(calculateStrength(''));
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        setIsScanning(true);
        const timer = setTimeout(() => {
            setAnalysis(calculateStrength(password));
            setIsScanning(false);
        }, 300); // Typing delay effect

        return () => clearTimeout(timer);
    }, [password]);

    // Handle Time to Crack Logic (Simulation)
    const getCrackTime = (pwd) => {
        if (!pwd) return '∞';
        const length = pwd.length;
        if (length < 6) return 'INSTANTLY';
        if (length < 9 && /^\d+$/.test(pwd)) return 'SECONDS';
        if (length < 9) return 'MINUTES';
        if (length < 11) return '3 DAYS';
        if (length < 13) return '5 YEARS';
        return '400 CENTURIES';
    };

    // Override time in analysis loop for more accuracy
    useEffect(() => {
        if (password) {
            setAnalysis(prev => ({
                ...prev,
                time: getCrackTime(password)
            }));
        }
    }, [password]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-24 px-4 font-mono w-full">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-full max-w-3xl bg-black/80 backdrop-blur-md border border-gray-800 p-8 rounded-lg relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]`}
            >
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
                    <h2 className="text-3xl text-cyber-green tracking-widest glitch-effect">
                        PASSWORD_STRENGTH_ANALYZER
                    </h2>
                    <span className="text-xs text-gray-500">V.2.0.FINAL</span>
                </div>

                {/* Input Section */}
                <div className="relative mb-10 group">
                    <label className="text-xs text-gray-500 mb-2 block tracking-widest">ENTER_PASSPHRASE_TARGET</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">{'>'}</span>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-black/40 border border-gray-700 rounded-none p-4 pl-12 text-xl text-white focus:outline-none focus:border-cyber-green transition-all duration-300 ${analysis.borderColor}`}
                            placeholder="Awaiting Input..."
                        />
                        {/* Scanning Line Animation on Focus/Typing */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-cyber-green"
                            initial={{ width: "0%" }}
                            animate={{ width: isScanning ? "100%" : "0%" }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>

                {/* Analysis Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                    {/* Status Display */}
                    <div className="bg-black/40 p-4 border-l-2 border-gray-700">
                        <span className="block text-xs text-gray-500 mb-1">ENCRYPTION STATUS</span>
                        <div className={`text-xl font-bold tracking-widest ${analysis.textColor}`}>
                            {isScanning ? 'CALCULATING...' : analysis.text}
                        </div>
                    </div>

                    {/* Crack Time Display */}
                    <div className="bg-black/40 p-4 border-l-2 border-gray-700">
                        <span className="block text-xs text-gray-500 mb-1">ESTIMATED BRUTE FORCE TIME</span>
                        <div className={`text-xl font-bold tracking-widest ${analysis.textColor}`}>
                            {isScanning ? '...' : analysis.time}
                        </div>
                    </div>

                </div>

                {/* Visual Strength Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>STRENGTH_METRIC</span>
                        <span>{Math.round(analysis.score)} / 100</span>
                    </div>
                    <div className="h-4 w-full bg-gray-900 overflow-hidden relative border border-gray-800">
                        {/* Background Grid Lines */}
                        <div className="absolute top-0 left-0 w-full h-full"
                            style={{ backgroundImage: 'linear-gradient(90deg, transparent 19%, rgba(50,50,50,0.5) 20%)', backgroundSize: '10% 100%' }}>
                        </div>

                        {/* Active Bar */}
                        <motion.div
                            className={`h-full ${analysis.color} shadow-[0_0_15px_currentColor]`}
                            initial={{ width: "0%" }}
                            animate={{ width: analysis.width }}
                            transition={{ type: "spring", stiffness: 50 }}
                        />
                    </div>
                </div>

                {/* Requirements List */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-600 mt-8">
                    <div className={password.length > 8 ? 'text-cyber-green' : ''}>[ {password.length > 8 ? '✓' : ' '} ] LENGTH &gt; 8</div>
                    <div className={/[A-Z]/.test(password) ? 'text-cyber-green' : ''}>[ {/[A-Z]/.test(password) ? '✓' : ' '} ] UPPERCASE</div>
                    <div className={/[0-9]/.test(password) ? 'text-cyber-green' : ''}>[ {/[0-9]/.test(password) ? '✓' : ' '} ] NUMBERS</div>
                    <div className={/[^A-Za-z0-9]/.test(password) ? 'text-cyber-green' : ''}>[ {/[^A-Za-z0-9]/.test(password) ? '✓' : ' '} ] SYMBOLS</div>
                </div>

            </motion.div>
        </div>
    );
};

export default PasswordStrengthTool;
