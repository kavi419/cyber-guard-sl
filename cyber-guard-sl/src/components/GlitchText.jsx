import React from 'react';

const GlitchText = ({ text }) => {
    return (
        <h1 className="text-6xl font-bold font-mono text-cyber-green mb-4 relative inline-block glitch-effect typing-cursor">
            {text}
        </h1>
    );
};

export default GlitchText;
