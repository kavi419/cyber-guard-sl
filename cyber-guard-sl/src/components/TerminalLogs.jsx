import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalLogs = () => {
    const [logs, setLogs] = useState([
        { id: 'init', msg: 'System Monitor Initialized...', type: 'sys' }
    ]);
    const bottomRef = useRef(null);

    const logMessages = [
        { msg: "Packet blocked from IP 45.231.xx.xx (Malicious)", type: 'warn' },
        { msg: "Firewall: Port 22 SSH Connection Denied", type: 'warn' },
        { msg: "Encrypted handshake established with Server-A", type: 'success' },
        { msg: "Neural Network: Pattern Analysis Complete", type: 'info' },
        { msg: "User Admin: Authentication Token Refreshed", type: 'sys' },
        { msg: "Scanning outgoing traffic: CLEAN", type: 'success' },
        { msg: "Anomaly detected in Sector 7", type: 'error' },
        { msg: "Routing traffic through secure proxy", type: 'info' },
        { msg: "Database integrity check: PASSED", type: 'success' },
        { msg: "Downloading latest threat definitions...", type: 'sys' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
            const newLog = {
                id: Date.now() + Math.random(),
                msg: randomLog.msg,
                type: randomLog.type
            };

            setLogs(prev => {
                const newLogs = [...prev, newLog];
                if (newLogs.length > 20) newLogs.shift(); // Keep logs buffer small
                return newLogs;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    // Scroll to bottom of the CONTAINER, not the window
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [logs]);

    const getColor = (type) => {
        switch (type) {
            case 'error': return 'text-red-500';
            case 'warn': return 'text-yellow-500';
            case 'success': return 'text-cyber-green';
            case 'sys': return 'text-gray-400';
            default: return 'text-white';
        }
    };

    return (
        // KEY FIX: Added h-48 (fixed height) and relative positioning
        <div className="h-48 w-full bg-black/50 font-mono text-xs relative p-2 rounded overflow-hidden">
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%]"></div>

            {/* KEY FIX: overflow-y-auto here handles the scrolling content */}
            <div
                className="h-full overflow-y-auto pb-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <AnimatePresence>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className={`mb-1 ${getColor(log.type)}`}
                        >
                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                            {log.msg}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={bottomRef} className="h-1" />

                {/* Blinking Cursor at the end of logs */}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-cyber-green mt-1"
                >
                    _
                </motion.div>
            </div>

            {/* Hide Scrollbar Style Tag for Webkit */}
            <style>{`
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default TerminalLogs;
