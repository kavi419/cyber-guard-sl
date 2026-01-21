import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-cyber-black border-t border-cyber-green/30 px-6 py-2 z-50">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 uppercase tracking-widest">

                {/* Left: System Status */}
                <div className="flex items-center space-x-2">
                    <span>SYSTEM STATUS: OPERATIONAL</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                </div>

                {/* Center: Encryption Info */}
                <div className="hidden md:block text-cyber-green/70">
                    ENCRYPTION: 256-BIT // SERVERS: ONLINE
                </div>

                {/* Right: Credits */}
                <div>
                    BUILT_BY: KAVINDU_AGENT_001
                </div>

            </div>
        </footer>
    );
};

export default Footer;
