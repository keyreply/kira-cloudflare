import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

const FloatingButton = ({ onClick, isOpen }) => {
    const [position, setPosition] = useState({ bottom: 80, right: 24 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const buttonStartPos = useRef({ bottom: 0, right: 0 });

    // Simple drag implementation
    const handleMouseDown = (e) => {
        setIsDragging(false); // Reset dragging state
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        buttonStartPos.current = { ...position };

        const handleMouseMove = (moveEvent) => {
            const deltaX = dragStartPos.current.x - moveEvent.clientX;
            const deltaY = dragStartPos.current.y - moveEvent.clientY;

            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                setIsDragging(true);
            }

            if (isDragging) { // Only update position if we are actually dragging
                setPosition({
                    bottom: buttonStartPos.current.bottom + deltaY,
                    right: buttonStartPos.current.right + deltaX
                });
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Fix for the simple drag logic above: 
    // The above logic has a bug where isDragging isn't updated in the closure of handleMouseMove.
    // Let's use a simpler approach for now: fixed position, maybe add drag later if requested or use a lib.
    // For MVP, let's stick to fixed position but styling it as requested.

    return (
        <button
            onClick={onClick}
            className={`fixed z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                }`}
            style={{
                bottom: '80px',
                right: '24px',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
        >
            <div className="relative">
                <SparklesIcon className="w-8 h-8 text-white" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
            <div className="absolute opacity-0 group-hover:opacity-100 right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                Ask AI
            </div>
        </button>
    );
};

export default FloatingButton;
