import React from 'react';
import { motion } from 'framer-motion';
import ThreatMap from './ThreatMap';

const CyberCard = ({ title, children, className = "" }) => (
    <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 65, 0.2)" }}
        className={`bg-cyber-gray border border-gray-800 p-6 rounded-lg relative overflow-hidden group ${className}`}
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-xl font-mono text-cyber-green mb-4 border-b border-gray-800 pb-2">{title}</h3>
        {children}
    </motion.div>
);

const Dashboard = () => {
    return (
        <div className="p-8 pt-24 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Global Threat Map */}
            <CyberCard title="Global Threat Map" className="col-span-1 md:col-span-2 row-span-2 h-[500px] relative w-full p-0 overflow-hidden">
                <ThreatMap />
            </CyberCard>

            {/* Card 2: System Status */}
            <CyberCard title="System Status" className="col-span-1">
                <div className="flex flex-col items-center justify-center h-48">
                    <div className="w-24 h-24 rounded-full border-4 border-cyber-green flex items-center justify-center shadow-[0_0_20px_#00ff41]">
                        <span className="text-cyber-green font-bold text-xl tracking-widest">SECURE</span>
                    </div>
                    <p className="mt-4 text-gray-400 font-mono text-sm">Firewall: ACTIVE</p>
                    <p className="text-gray-400 font-mono text-sm">Encryption: AES-256</p>
                </div>
            </CyberCard>

            {/* Card 3: Recent Alerts */}
            <CyberCard title="Recent Alerts" className="col-span-1">
                <ul className="space-y-3">
                    {[
                        { id: 1, msg: "Phishing detected in WhatsApp Group A", level: "warning" },
                        { id: 2, msg: "Suspicious login attempt blocked (IP: 192.168.x.x)", level: "danger" },
                        { id: 3, msg: "New malware signature database updated", level: "info" }
                    ].map((alert) => (
                        <li key={alert.id} className="text-sm font-mono p-2 border-l-2 border-cyber-green bg-black/20 hover:bg-black/40 transition">
                            <span className="block text-gray-300">{alert.msg}</span>
                        </li>
                    ))}
                </ul>
            </CyberCard>
        </div>
    );
};

export default Dashboard;
