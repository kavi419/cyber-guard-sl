import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScamFeed = () => {
    const [news, setNews] = useState([
        "ALERT: New WhatsApp OTP Scam Detected...",
        "WARNING: Phishing attacks on Bank customers rising...",
        "CRITICAL: Fake 'Apple Support' calls targeting elderly...",
        "NOTICE: Update your banking apps to the latest version immediately...",
        "INTEL: Dark web marketplace selling credit card details taken down..."
    ]);

    const [alerts, setAlerts] = useState([
        {
            id: 1,
            title: "WhatsApp 'Friend in Need' Scam",
            description: "Scammers posing as friends asking for urgent money transfers via WhatsApp.",
            date: "2026-01-21",
            riskLevel: "HIGH"
        },
        {
            id: 2,
            title: "Fake Bank Login Page",
            description: "Phishing links circulating via SMS claiming to be from major local banks.",
            date: "2026-01-20",
            riskLevel: "HIGH"
        },
        {
            id: 3,
            title: "Lottery Win SMS",
            description: "Classic lottery scam promising huge winnings for a small processing fee.",
            date: "2026-01-19",
            riskLevel: "MEDIUM"
        },
        {
            id: 4,
            title: "Job Offer Scam",
            description: "Too-good-to-be-true remote job offers requiring upfront payment for 'equipment'.",
            date: "2026-01-18",
            riskLevel: "MEDIUM"
        },
        {
            id: 5,
            title: "Suspicious Email Attachment",
            description: "Emails with 'Invoice.pdf.exe' attachments containing malware.",
            date: "2026-01-17",
            riskLevel: "LOW"
        },
        {
            id: 6,
            title: "Social Media Identity Theft",
            description: "Cloned profiles requesting money from friends list.",
            date: "2026-01-16",
            riskLevel: "LOW"
        }
    ]);

    const riskColors = {
        HIGH: "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
        MEDIUM: "border-yellow-500 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]",
        LOW: "border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
    };

    return (
        <div className="p-8 h-full w-full font-mono text-white">
            {/* News Ticker */}
            <div className="w-full bg-cyber-gray border-y border-cyber-green/30 mb-8 overflow-hidden relative h-12 flex items-center">
                <div className="absolute top-0 left-0 bg-cyber-green/20 px-4 h-full flex items-center z-10 font-bold border-r border-cyber-green text-cyber-green">
                    LIVE INTEL
                </div>
                <motion.div
                    className="whitespace-nowrap flex"
                    animate={{ x: [1000, -2000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {news.map((item, index) => (
                        <span key={index} className="mx-8 text-cyber-green/80 uppercase tracking-wider">
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Intel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alerts.map((alert) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: alert.id * 0.1 }}
                        className={`relative p-6 bg-black/40 border-l-4 ${riskColors[alert.riskLevel]} backdrop-blur-sm overflow-hidden group cursor-cell`}
                    >
                        {/* Scan animation on hover */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/50 opacity-0 group-hover:opacity-100 group-hover:animate-scan-down"></div>

                        <div className="flex justify-between items-start mb-4">
                            {/* Risk Level Badge */}
                            <span className={`text-xs font-bold border px-2 py-1 rounded ${riskColors[alert.riskLevel].split(' ')[0]} ${riskColors[alert.riskLevel].split(' ')[1]}`}>
                                {alert.riskLevel} RISK
                            </span>
                            <span className="text-gray-400 text-xs">{alert.date}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 tracking-wide font-mono text-gray-100 group-hover:text-white transition-colors">
                            {alert.title}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed font-mono">
                            {alert.description}
                        </p>

                        {/* Decor corner */}
                        <div className="absolute bottom-0 right-0 p-2 opacity-50">
                            <div className="w-3 h-3 border-r-2 border-b-2 border-inherit"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ScamFeed;
