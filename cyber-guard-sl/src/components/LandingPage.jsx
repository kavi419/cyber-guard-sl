import React from 'react';
import { motion } from 'framer-motion';
import ThreeDGlobe from './ThreeDGlobe';
import GlitchText from './GlitchText';

const LandingPage = ({ onInitialize }) => {
    return (
        <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex h-screen w-full relative z-10 bg-transparent"
        >
            {/* Left Side: Text */}
            <div className="w-1/2 flex flex-col justify-center p-12 z-10 pl-24">
                <GlitchText text="CyberGuard SL" />
                <p className="text-xl text-gray-300 font-mono mb-8 tracking-wider">
                    Secure. Monitor. Protect.
                </p>
                <div>
                    <button
                        onClick={onInitialize}
                        className="px-8 py-4 border-2 border-cyber-green text-cyber-green font-bold font-mono rounded hover:bg-cyber-green hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)] text-lg tracking-widest uppercase relative overflow-hidden group"
                    >
                        <span className="relative z-10">Initialize System</span>
                        <div className="absolute inset-0 bg-cyber-green transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
                    </button>
                </div>
            </div>

            {/* Right Side: Globe */}
            <div className="w-1/2 h-full z-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                    <ThreeDGlobe />
                </div>
            </div>

            {/* Overlay Grid/Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </motion.div>
    );
};

export default LandingPage;
