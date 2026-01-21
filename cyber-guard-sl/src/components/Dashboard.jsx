import React from 'react';
import { motion } from 'framer-motion';
import ThreatAnalytics from './ThreatAnalytics';
import TerminalLogs from './TerminalLogs';

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
            {/* Card 1: Threat Analytics Panel */}
            <CyberCard title="Threat Analytics" className="col-span-1 md:col-span-2 row-span-2 h-[500px] relative w-full p-0 overflow-hidden">
                <ThreatAnalytics />
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
            <CyberCard title="Live System Logs" className="col-span-1">
                <TerminalLogs />
            </CyberCard>
        </div>
    );
};

export default Dashboard;
