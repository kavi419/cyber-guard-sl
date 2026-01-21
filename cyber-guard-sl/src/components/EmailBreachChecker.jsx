import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmailBreachChecker = () => {
    const [email, setEmail] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [result, setResult] = useState(null);
    const logsEndRef = useRef(null);

    const scanLogs = [
        "Initializing secure handshake...",
        "Routing through proxy chains (Node 14.2.1)...",
        "Connection established to Dark Web Index...",
        "Querying breach databases: [LinkedIn, Adobe, Canva]...",
        "Analyzing 14 billion records...",
        "Decrypting hash fragments...",
        "Cross-referencing email metadata...",
        "Verifying PGP signatures...",
        "Scan complete."
    ];

    const handleScan = () => {
        if (!email || !email.includes('@')) return; // Basic validation

        setIsScanning(true);
        setLogs([]);
        setResult(null);
        let logIndex = 0;

        const interval = setInterval(() => {
            if (logIndex < scanLogs.length) {
                setLogs(prev => [...prev, scanLogs[logIndex]]);
                logIndex++;
            } else {
                clearInterval(interval);
                finishScan();
            }
        }, 300); // Speed of logs
    };

    const finishScan = () => {
        setIsScanning(false);
        // Simulate random result for demo purposes
        const isBreached = Math.random() > 0.5;

        if (isBreached) {
            setResult({
                status: 'COMPROMISED',
                color: 'text-red-500',
                borderColor: 'border-red-600',
                bg: 'bg-red-900/20',
                details: [
                    { source: "LinkedIn 2012 Drop", data: "Email, Password (SHA1)" },
                    { source: "Collection #1", data: "Email, IP Address" },
                    { source: "Canva Breach", data: "Email, Name, City" }
                ]
            });
        } else {
            setResult({
                status: 'CLEAN',
                color: 'text-cyber-green',
                borderColor: 'border-cyber-green',
                bg: 'bg-green-900/20',
                details: ["No matches found in known breach databases."]
            });
        }
    };

    // Auto-scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-24 px-4 font-mono w-full">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-4xl bg-black/90 backdrop-blur border border-cyber-green/30 p-8 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.1)] relative overflow-hidden"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-widest glitch-effect">
                        IDENTITY_THEFT_SCANNER
                    </h1>
                    <p className="text-gray-400 text-sm tracking-[0.2em]">
                        DARK WEB SURVEILLANCE SYSTEM V.4.0
                    </p>
                </div>

                {/* Input Area */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-green text-xl">{'>'}</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isScanning}
                            className="w-full bg-black/50 border border-gray-700 p-4 pl-12 text-xl text-white focus:outline-none focus:border-cyber-green focus:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all placeholder-gray-600"
                            placeholder="ENTER_TARGET_EMAIL"
                        />
                    </div>
                    <button
                        onClick={handleScan}
                        disabled={isScanning || !email}
                        className={`px-8 py-4 font-bold tracking-widest transition-all duration-300 ${isScanning
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                : 'bg-cyber-green text-black hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] cursor-pointer'
                            }`}
                    >
                        {isScanning ? 'SCANNING...' : 'INITIATE_SCAN'}
                    </button>
                </div>

                {/* Terminal Logs */}
                <div className="bg-black border border-gray-800 p-4 h-48 overflow-y-auto font-mono text-sm mb-8 rounded shadow-inner custom-scrollbar">
                    {logs.length === 0 && !result && (
                        <div className="text-gray-600 italic">System ready. Awaiting target input...</div>
                    )}
                    {logs.map((log, index) => (
                        <div key={index} className="mb-1 text-gray-300">
                            <span className="text-cyber-green mr-2">$</span>
                            {log}
                        </div>
                    ))}
                    <div ref={logsEndRef} />
                </div>

                {/* Result Card */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`border-l-4 ${result.borderColor} ${result.bg} p-6`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className={`text-3xl font-bold tracking-widest ${result.color}`}>
                                    STATUS: {result.status}
                                </h2>
                                {result.status === 'COMPROMISED' && (
                                    <span className="animate-pulse text-red-500 text-xl">⚠️ ALERT ⚠️</span>
                                )}
                            </div>

                            <div className="space-y-2">
                                {result.details.map((item, idx) => (
                                    <div key={idx} className="text-gray-300 border-b border-gray-700/50 pb-2 mb-2 last:border-0">
                                        {typeof item === 'string' ? (
                                            item
                                        ) : (
                                            <>
                                                <div className="text-sm text-gray-500 uppercase">BREACH SOURCE</div>
                                                <div className="text-lg text-white mb-1">{item.source}</div>
                                                <div className="text-xs text-red-400">EXPOSED: {item.data}</div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default EmailBreachChecker;
