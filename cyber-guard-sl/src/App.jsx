import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ThreeDGlobe from './components/ThreeDGlobe';
import GlitchText from './components/GlitchText';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PasswordChecker from './components/PasswordChecker';
import ScamAlerts from './components/ScamAlerts';
import ReportScam from './components/ReportScam';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import CustomCursor from './components/CustomCursor';
import PasswordStrengthTool from './components/PasswordStrengthTool';
import EmailBreachChecker from './components/EmailBreachChecker';
import LiveMapPage from './pages/LiveMapPage';
import ScamArticle from './pages/ScamArticle';
import { motion, AnimatePresence } from 'framer-motion';

// --- Main System Interface (Dashboard) ---
const SystemInterface = () => {
  const [isSystemReady, setSystemReady] = useState(false);


  const [currentView, setCurrentView] = useState('dashboard');

  const handleInitialize = () => {
    setSystemReady(true);
  };


  return (
    <>
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
                  onClick={handleInitialize}
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
                    <ScamAlerts />
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
                ) : currentView === 'email-check' ? (
                  <motion.div
                    key="email-check"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EmailBreachChecker />
                  </motion.div>
                ) : currentView === 'live-map' ? (
                  <motion.div
                    key="live-map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LiveMapPage />
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Dashboard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- App Container with Routing ---
function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative cursor-none bg-transparent">
      <CustomCursor />
      <MatrixRain />
      {/* Scanline Overlay */}
      <div className="scanline-overlay pointer-events-none z-50 fixed inset-0">
        <div className="scanline-moving-bar"></div>
      </div>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SystemInterface />} />
          <Route path="/scam/:id" element={<ScamArticle />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
