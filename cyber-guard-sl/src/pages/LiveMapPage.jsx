import React from 'react';
import CyberNightGlobe from '../components/CyberNightGlobe';
import { motion } from 'framer-motion';

const LiveMapPage = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Globe */}
            <div className="absolute inset-0 z-0">
                <CyberNightGlobe />
            </div>

            {/* Overlay UI - minimal HUD */}
            <div className="absolute top-24 left-8 z-10 pointers-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl font-bold text-white tracking-widest glitch-effect mb-2">
                        GLOBAL_THREAT_MAP
                    </h1>
                    <div className="flex items-center space-x-2 text-cyber-green font-mono text-sm">
                        <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></span>
                        <span>LIVE SATELLITE FEED // ENCRYPTED</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-between items-end text-xs font-mono text-gray-400">
                <div>
                    <div>COORDINATES: {Math.random().toFixed(4)} N, {Math.random().toFixed(4)} W</div>
                    <div>SECTOR: ALPHA-9</div>
                </div>
                <div className="text-right">
                    <div>SCANNING NODES...</div>
                    <div className="text-cyber-green">THREAT LEVEL: MODERATE</div>
                </div>
            </div>
        </div>
    );
};

export default LiveMapPage;
