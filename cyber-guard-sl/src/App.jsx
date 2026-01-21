import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// ThreeDGlobe and GlitchText moved to LandingPage.jsx
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
import LandingPage from './components/LandingPage';
import ScamArticle from './pages/ScamArticle';
import { motion, AnimatePresence } from 'framer-motion';

// --- Main System Interface (Dashboard) ---
const SystemInterface = () => {
  const location = useLocation();

  // Check if we should skip the landing page (e.g. returning from internal navigation)
  // CRITICAL: Force Landing Page on Browser Refresh (Reload)
  const [isSystemReady, setSystemReady] = useState(() => {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      return false;
    }
    return location.state?.skipLanding || false;
  });

  const [currentView, setCurrentView] = useState(() => {
    // Check if arriving with a specific view request (e.g. Back from Article)
    return location.state?.view || 'dashboard';
  });

  const handleInitialize = () => {
    setSystemReady(true);
    setCurrentView('dashboard'); // Ensure we land on the Dashboard
  };


  return (
    <>
      <AnimatePresence mode='wait'>
        {!isSystemReady ? (
          /* Landing View Component */
          <LandingPage onInitialize={handleInitialize} />
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
