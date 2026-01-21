import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            // Check if the target is clickable (button, link, input, or has pointer cursor)
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.getAttribute('role') === 'button' ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
            }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.5
            }}
        >
            {/* Outer Ring */}
            <div className={`absolute w-full h-full border rounded-full transition-colors duration-200 ${isHovering ? 'border-cyber-green bg-cyber-green/10' : 'border-cyber-green'}`}></div>

            {/* Center Dot */}
            <div className={`w-1 h-1 bg-cyber-green rounded-full ${isHovering ? 'hidden' : 'block'}`}></div>
        </motion.div>
    );
};

export default CustomCursor;
