import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportScam = () => {
    const [step, setStep] = useState('loading'); // 'loading' | 'form' | 'submitting' | 'success'
    const [formData, setFormData] = useState({
        threatType: '',
        attackerDetails: '',
        description: '',
        file: null
    });

    const [loadingText, setLoadingText] = useState("OPENING SECURE UPLINK...");

    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};

        // Regex Patterns
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        const phoneRegex = /^[\d\+\-\s\(\)]{9,}$/; // Allows digits, +, -, spaces, parens (min 9 chars)

        if (!formData.threatType) newErrors.threatType = "PROTOCOL REQUIRED";

        // Validate Target Identifier (Must be Email, URL, or Phone)
        if (!formData.attackerDetails || formData.attackerDetails.length < 3) {
            newErrors.attackerDetails = "INVALID IDENTIFIER";
        } else {
            const val = formData.attackerDetails;
            if (!emailRegex.test(val) && !urlRegex.test(val) && !phoneRegex.test(val)) {
                newErrors.attackerDetails = "MUST BE VALID URL, EMAIL, OR PHONE";
            }
        }

        if (!formData.description || formData.description.length < 10) newErrors.description = "DATA INSUFFICIENT";

        // Validate File
        if (!formData.file) newErrors.file = "EVIDENCE REQUIRED";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStep('submitting');
        // Clear previous errors
        setErrors({});

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
                        setFormData({ threatType: '', attackerDetails: '', description: '', file: null });
                        setStep('form');
                    }, 2000);
                }, 500);
            }
        }, 800);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
        if (errors.file) {
            setErrors({ ...errors, file: null });
        }
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
                                <label className="text-xs uppercase tracking-widest text-gray-400">
                                    Threat Vector {errors.threatType && <span className="text-red-500 animate-pulse ml-2">// {errors.threatType}</span>}
                                </label>
                                <select
                                    name="threatType"
                                    value={formData.threatType}
                                    onChange={handleInputChange}
                                    className={`bg-gray-900/50 border p-3 text-white focus:outline-none focus:ring-1 transition-all ${errors.threatType
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-100'
                                        : 'border-cyber-green/50 focus:border-cyber-green focus:ring-cyber-green'
                                        }`}
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
                                <label className="text-xs uppercase tracking-widest text-gray-400">
                                    Target Identifier (URL / Phone / Email)
                                    {errors.attackerDetails && <span className="text-red-500 animate-pulse ml-2">// {errors.attackerDetails}</span>}
                                </label>
                                <input
                                    type="text"
                                    name="attackerDetails"
                                    value={formData.attackerDetails}
                                    onChange={handleInputChange}
                                    placeholder="ENTER HOSTILE IDENTIFIER"
                                    className={`bg-gray-900/50 border p-3 text-white focus:outline-none focus:ring-1 font-mono placeholder-gray-600 ${errors.attackerDetails
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-cyber-green/50 focus:border-cyber-green focus:ring-cyber-green'
                                        }`}
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400">
                                    Event Log / Details
                                    {errors.description && <span className="text-red-500 animate-pulse ml-2">// {errors.description}</span>}
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="// Describe the incident protocol here..."
                                    className={`bg-gray-900/50 border p-3 text-white focus:outline-none focus:ring-1 font-mono placeholder-gray-600 ${errors.description
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-cyber-green/50 focus:border-cyber-green focus:ring-cyber-green'
                                        }`}
                                ></textarea>
                            </div>

                            {/* File Input */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400">
                                    Digital Forensics (Screenshots/Logs)
                                    {errors.file && <span className="text-red-500 animate-pulse ml-2">// {errors.file}</span>}
                                </label>
                                <div className={`relative border border-dashed bg-gray-900/30 p-8 text-center cursor-pointer hover:bg-cyber-green/10 transition-colors group ${errors.file
                                        ? 'border-red-500'
                                        : 'border-cyber-green/50'
                                    }`}>
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                    <p className={`transition-colors ${errors.file ? 'text-red-400' : 'text-cyber-green group-hover:text-white'}`}>
                                        {formData.file
                                            ? `>> PACKET READY: ${formData.file.name}`
                                            : ">> UPLOAD_EVIDENCE_PACKET"
                                        }
                                    </p>
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
