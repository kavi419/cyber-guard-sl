import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportScam = () => {
    const [step, setStep] = useState('loading'); // 'loading' | 'form' | 'submitting' | 'success'
    const [formData, setFormData] = useState({
        threatType: '',
        attackerDetails: '',
        description: ''
    });

    const [loadingText, setLoadingText] = useState("OPENING SECURE UPLINK...");

    useEffect(() => {
        if (step === 'loading') {
            const texts = [
                "OPENING SECURE UPLINK...",
                "ESTABLISHING ENCRYPTED TUNNEL...",
                "VERIFYING HANDSHAKE...",
                "ACCESS GRANTED"
            ];
            let i = 0;
            const interval = setInterval(() => {
                setLoadingText(texts[i]);
                i++;
                if (i >= texts.length) {
                    clearInterval(interval);
                    setTimeout(() => setStep('form'), 800);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('submitting');

        // Simulate encryption and transmission
        const texts = [
            "ENCRYPTING PAYLOAD...",
            "ROUTING THROUGH PROXY...",
            "SENDING PACKETS...",
            "UPLOAD COMPLETE"
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLoadingText(texts[i]);
            i++;
            if (i >= texts.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setStep('success');
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        setFormData({ threatType: '', attackerDetails: '', description: '' });
                        setStep('form');
                    }, 2000);
                }, 500);
            }
        }, 800);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 pt-32 font-mono text-cyber-green">

            <AnimatePresence mode='wait'>
                {step === 'loading' || step === 'submitting' ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-2xl font-bold tracking-widest text-center"
                    >
                        <div className="mb-4 text-4xl animate-pulse">
                            <span className="inline-block w-4 h-4 bg-cyber-green mr-2 align-middle"></span>
                            {step === 'submitting' ? 'TRANSMITTING' : 'INITIALIZING'}
                        </div>
                        <p className="glitch-effect">{loadingText}</p>
                        <div className="mt-8 w-64 h-2 bg-gray-800 rounded overflow-hidden">
                            <motion.div
                                className="h-full bg-cyber-green"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear", repeat: step === 'submitting' ? Infinity : 0 }}
                            />
                        </div>
                    </motion.div>
                ) : step === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center border-4 border-cyber-green p-12 bg-black/50 backdrop-blur-md"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-white">TRANSMISSION RECEIVED</h2>
                        <p className="text-xl text-cyber-green">THREAT LOGGED IN SECURE DATABASE.</p>
                        <div className="mt-6 text-sm text-gray-400">TRACE ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl border border-cyber-green/30 bg-black/40 backdrop-blur-md p-8 relative shadow-[0_0_20px_rgba(0,255,65,0.1)]"
                    >
                        {/* Corner decors */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-green"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-green"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-green"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-green"></div>

                        <h2 className="text-3xl font-bold mb-8 text-white border-b border-cyber-green/30 pb-4 tracking-wider">
                            REPORT CYBER THREAT
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Threat Type */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400">Threat Vector</label>
                                <select
                                    name="threatType"
                                    value={formData.threatType}
                                    onChange={handleInputChange}
                                    className="bg-gray-900/50 border border-cyber-green/50 p-3 text-white focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-all"
                                    required
                                >
                                    <option value="" disabled>SELECT VECTOR...</option>
                                    <option value="phishing">PHISHING ATTEMPT</option>
                                    <option value="sms_fraud">SMS FRAUD / SMISHING</option>
                                    <option value="ponzi">PONZI / PYRAMID SCHEME</option>
                                    <option value="malware">MALWARE / RANSOMWARE</option>
                                    <option value="other">OTHER ANOMALY</option>
                                </select>
                            </div>

                            {/* Attacker Details */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400">Target Identifier (URL / Phone / Email)</label>
                                <input
                                    type="text"
                                    name="attackerDetails"
                                    value={formData.attackerDetails}
                                    onChange={handleInputChange}
                                    placeholder="ENTER HOSTILE IDENTIFIER"
                                    className="bg-gray-900/50 border border-cyber-green/50 p-3 text-white focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green font-mono placeholder-gray-600"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400">Event Log / Details</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="// Describe the incident protocol here..."
                                    className="bg-gray-900/50 border border-cyber-green/50 p-3 text-white focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green font-mono placeholder-gray-600"
                                    required
                                ></textarea>
                            </div>

                            {/* File Input */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400">Digital Forensics (Screenshots/Logs)</label>
                                <div className="relative border border-dashed border-cyber-green/50 bg-gray-900/30 p-8 text-center cursor-pointer hover:bg-cyber-green/10 transition-colors group">
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <p className="text-cyber-green group-hover:text-white transition-colors">&gt;&gt; UPLOAD_EVIDENCE_PACKET</p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-cyber-green/10 border border-cyber-green text-cyber-green py-4 font-bold tracking-[0.2em] hover:bg-cyber-green hover:text-black transition-all duration-300 mt-8 relative overflow-hidden group"
                            >
                                <span className="relative z-10">ENCRYPT & TRANSMIT</span>
                            </button>

                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReportScam;
