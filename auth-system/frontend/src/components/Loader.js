import React, { useState, useEffect } from 'react';
import "./FeatureCard.css";

const QuickAnimatedLoader = () => {
    const [rotationDegree, setRotationDegree] = useState(0);
    const [pulseState, setPulseState] = useState(false);

    // Handle rotation animation
    useEffect(() => {
        const rotationTimer = setInterval(() => {
            setRotationDegree(prev => (prev + 15) % 360);
        }, 50);

        return () => clearInterval(rotationTimer);
    }, []);

    // Handle pulse animation
    useEffect(() => {
        const pulseTimer = setInterval(() => {
            setPulseState(prev => !prev);
        }, 800);

        return () => clearInterval(pulseTimer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative">
                {/* Outer spinning ring */}
                <div
                    className="w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400"
                    style={{
                        transform: `rotate(${rotationDegree}deg)`,
                        transition: 'transform 0.05s linear'
                    }}
                />

                {/* Middle spinning ring - opposite direction */}
                <div
                    className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-transparent border-b-indigo-500 border-l-indigo-400"
                    style={{
                        transform: `rotate(${-rotationDegree * 1.5}deg)`,
                        transition: 'transform 0.05s linear'
                    }}
                />

                {/* Inner pulsing circle */}
                <div
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 transition-all duration-300 ease-in-out"
                    style={{
                        transform: pulseState ? 'scale(0.85)' : 'scale(1)',
                        opacity: pulseState ? 0.85 : 1
                    }}
                />

                {/* Center dot */}
                <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-white shadow-md" />
            </div>
        </div>
    );
};

export default QuickAnimatedLoader;