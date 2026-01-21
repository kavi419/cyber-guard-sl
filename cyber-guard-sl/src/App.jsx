import React, { useState } from 'react';
import ThreeDGlobe from './components/ThreeDGlobe';
import GlitchText from './components/GlitchText';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PasswordChecker from './components/PasswordChecker';
import ScamFeed from './components/ScamFeed';
import ReportScam from './components/ReportScam';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import CustomCursor from './components/CustomCursor';
import PasswordStrengthTool from './components/PasswordStrengthTool';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isSystemReady, setSystemReady] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative cursor-none">
      <CustomCursor />
      <MatrixRain />
      {/* Scanline Overlay */}
      <div className="scanline-overlay">
        <div className="scanline-moving-bar"></div>
      </div>

      <AnimatePresence mode='wait'>
        {!isSystemReady ? (
          /* Landing View */
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex h-screen w-full relative z-10"
          >
            {/* Left Side: Text */}
            <div className="w-1/2 flex flex-col justify-center p-12 z-10">
              <GlitchText text="CyberGuard SL" />
              <p className="text-xl text-gray-300 font-mono mb-8">
                Secure. Monitor. Protect.
              </p>
              <div>
                <button
                  onClick={() => setSystemReady(true)}
                  className="px-6 py-3 border border-cyber-green text-cyber-green font-bold font-mono rounded hover:bg-cyber-green hover:text-black transition cursor-pointer"
                >
                  Initialize System
                </button>
              </div>
            </div>

            {/* Right Side: Globe */}
            <div className="w-1/2 h-full z-0">
              <ThreeDGlobe />
            </div>
          </motion.div>
        ) : (
          /* Main Interface */
          <motion.div
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full min-h-screen relative z-10"
          >
            <Navbar setCurrentView={setCurrentView} />

            {/* Content Area */}
            <div className="pt-4 pb-12">
              <AnimatePresence mode='wait'>
                {currentView === 'dashboard' ? (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                ) : currentView === 'scam-feed' ? (
                  <motion.div
                    key="scam-feed"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScamFeed />
                  </motion.div>
                ) : currentView === 'report' ? (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ReportScam />
                  </motion.div>
                ) : currentView === 'password-tool' ? (
                  <motion.div
                    key="password-tool"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PasswordStrengthTool />
                  </motion.div>
                ) : (
                  <motion.div
                    key="password-checker"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PasswordChecker />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
