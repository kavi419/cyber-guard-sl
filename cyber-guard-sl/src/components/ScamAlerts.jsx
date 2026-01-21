import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { scamData } from '../data/scamData';

const ScamAlerts = () => {
    return (
        <div className="relative h-full w-full font-mono text-white overflow-hidden bg-transparent">
            {/* Content Container */}
            <div className="relative z-10 h-full w-full flex flex-col">
                {/* Live Intel Ticker */}
                <div className="w-full bg-black/80 border-b border-cyber-green/30 overflow-hidden py-2 shrink-0">
                    <div className="whitespace-nowrap animate-marquee">
                        <span className="text-cyber-green/80 font-bold mx-4 tracking-wider">
                            ⚠ ALERT: NEW WHATSAPP OTP SCAM DETECTED
                        </span>
                        <span className="text-cyber-green/80 mx-4">///</span>
                        <span className="text-cyber-green/80 font-bold mx-4 tracking-wider">
                            ⚠ WARNING: PHISHING ATTACKS ON BANK CUSTOMERS RISING
                        </span>
                        <span className="text-cyber-green/80 mx-4">///</span>
                        <span className="text-cyber-green/80 font-bold mx-4 tracking-wider">
                            ⚠ SYSTEM SECURITY PATCH AVAILABLE - UPDATE RECOMMENDED
                        </span>
                        <span className="text-cyber-green/80 mx-4">///</span>
                        <span className="text-cyber-green/80 font-bold mx-4 tracking-wider">
                            ⚠ TARGETED ATTACKS ON ELDERLY DEMOGRAPHIC IDENTIFIED
                        </span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-8 overflow-y-auto flex-1 pb-20">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-8 border-b border-cyber-green/30 pb-4 bg-black/40 p-4 rounded-lg backdrop-blur-sm">
                        <div className="w-3 h-3 bg-red-500 animate-pulse rounded-full"></div>
                        <h2 className="text-2xl font-bold tracking-widest text-cyber-green uppercase shadow-neon">
                            Active Threats Detected // {scamData.length}
                        </h2>
                    </div>

                    {/* Intel Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scamData.map((scam, index) => (
                            <motion.div
                                key={scam.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 bg-black/80 border border-gray-700 hover:border-cyber-green/80 transition-colors duration-300 group flex flex-col justify-between h-[280px] backdrop-blur-md"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-cyber-green/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 rounded">
                                            THREAT ID: {scam.id.toString().padStart(3, '0')}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 tracking-wide text-white group-hover:text-cyber-green transition-colors">
                                        {scam.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                        {scam.shortDesc}
                                    </p>
                                </div>

                                <Link
                                    to={`/scam/${scam.id}`}
                                    className="mt-6 inline-flex items-center justify-center space-x-2 w-full py-2 bg-transparent border border-gray-500 hover:border-cyber-green text-gray-300 hover:text-black hover:bg-cyber-green transition-all duration-300 uppercase text-xs font-bold tracking-wider"
                                >
                                    <span>Read Warning</span>
                                    <span>&rarr;</span>
                                </Link>

                                {/* Corner Accents */}
                                <div className="absolute top-0 right-0 p-2">
                                    <div className="w-2 h-2 border-t border-r border-gray-500 group-hover:border-cyber-green transition-colors"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 p-2">
                                    <div className="w-2 h-2 border-b border-l border-gray-500 group-hover:border-cyber-green transition-colors"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default ScamAlerts;
