import React from 'react';
import CyberNightGlobe from '../components/CyberNightGlobe';
import { motion } from 'framer-motion';

const LiveMapPage = () => {
    return (
        // Fixed positioning to break out of parent containers padding
        <div className="fixed inset-0 z-40 w-screen h-screen overflow-hidden bg-black flex flex-col pt-20">
            {/* Background Globe - Fills available space */}
            <div className="relative flex-1 w-full min-h-0">
                <CyberNightGlobe />

                {/* Overlay UI - minimal HUD (Inside relative container to stay properly positioned) */}
                <div className="absolute top-4 left-8 z-10 pointers-events-none">
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

                {/* Bottom Status Bar - Absolute at bottom of container */}
                <div className="absolute bottom-6 left-8 right-8 z-10 flex justify-between items-end text-xs font-mono text-gray-400 pointer-events-none">
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
        </div>
    );
};

export default LiveMapPage;
