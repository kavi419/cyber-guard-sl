import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ThreatAnalytics = () => {
    // Top Threats Data
    const threats = [
        { name: 'RANSOMWARE', level: 85, color: 'bg-red-500' },
        { name: 'SQL INJECTION', level: 62, color: 'bg-orange-500' },
        { name: 'PHISHING', level: 93, color: 'bg-red-600' },
        { name: 'DDoS ATTACKS', level: 45, color: 'bg-yellow-500' },
    ];

    // Mock Traffic Data for Waveform
    const [trafficHeight, setTrafficHeight] = useState(Array(20).fill(10));

    useEffect(() => {
        const interval = setInterval(() => {
            setTrafficHeight(prev => prev.map(() => Math.floor(Math.random() * 40) + 10));
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full bg-black/40 p-4 font-mono text-white flex flex-col space-y-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-cyber-green/30 pb-2">
                <h3 className="text-cyber-green font-bold tracking-widest text-sm">
                    NETWORK TRAFFIC & THREAT ANALYTICS
                </h3>
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                    <span className="text-xs text-cyber-green/80">LIVE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Left Col: Threat Index & Traffic */}
                <div className="flex flex-col space-y-6">
                    {/* Threat Index Gauge (Simulated) */}
                    <div className="flex-1 bg-black/60 border border-gray-800 p-4 rounded relative flex flex-col items-center justify-center">
                        <span className="text-xs text-gray-400 absolute top-2 left-2">THREAT INDEX</span>

                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {/* Outer Ring */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64" cy="64" r="56"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent" className="text-gray-800"
                                />
                                <circle
                                    cx="64" cy="64" r="56"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent" className="text-red-600"
                                    strokeDasharray="351"
                                    strokeDashoffset="70" // 80% filled
                                    strokeLinecap="round"
                                />
                            </svg>
                            {/* Inner Info */}
                            <div className="absolute flex flex-col items-center">
                                <span className="text-3xl font-bold text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">HIGH</span>
                                <span className="text-[10px] text-gray-500">LEVEL 4</span>
                            </div>
                        </div>
                    </div>

                    {/* Traffic Waveform */}
                    <div className="h-24 bg-black/60 border border-gray-800 p-2 rounded flex items-end justify-between space-x-1">
                        {trafficHeight.map((h, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: `${h}px` }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-1.5 bg-cyber-green/60 rounded-t-sm"
                            />
                        ))}
                    </div>
                </div>

                {/* Right Col: Top Threats List */}
                <div className="bg-black/60 border border-gray-800 p-4 rounded flex flex-col overflow-y-auto">
                    <span className="text-xs text-gray-400 mb-4 uppercase">Global Threat Vectors</span>
                    <div className="space-y-4">
                        {threats.map((threat, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-300 group-hover:text-cyber-green transition-colors">{threat.name}</span>
                                    <span className="text-gray-500">{threat.level}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${threat.level}%` }}
                                        transition={{ duration: 1.5, delay: index * 0.2 }}
                                        className={`h-full ${threat.color} shadow-[0_0_8px_currentColor]`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};

export default ThreatAnalytics;
