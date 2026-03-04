"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export function WelcomeBackToast() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const lastVisit = localStorage.getItem('tanishtra-last-visit');
        const now = new Date().getTime();

        if (lastVisit) {
            const timeSinceLastVisit = now - parseInt(lastVisit, 10);
            // Show toast if they return after 12 hours (43200000 ms)
            if (timeSinceLastVisit > 43200000) {
                setTimeout(() => setIsVisible(true), 2000);
                setTimeout(() => setIsVisible(false), 8000); // Auto hide
            }
        }

        // Update last visit
        localStorage.setItem('tanishtra-last-visit', now.toString());
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="fixed top-24 right-4 md:right-8 z-[1500] bg-[#16161B] border border-[#C6A75E]/30 p-4 rounded-lg shadow-2xl flex items-start gap-4 max-w-[320px]"
                >
                    <div className="w-10 h-10 rounded-full bg-[#C6A75E]/10 flex items-center justify-center shrink-0">
                        <Sparkles size={18} className="text-[#C6A75E]" />
                    </div>
                    <div>
                        <h4 className="font-playfair text-[18px] text-[#F5F5F7] leading-tight mb-1">Welcome Back.</h4>
                        <p className="font-inter text-[13px] text-[#A1A1AA]">
                            Resume building your armor. New arrivals are waiting.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-[#6B6B73] hover:text-[#F5F5F7] transition-colors ml-auto"
                        aria-label="Close welcome back message"
                    >
                        <X size={16} />
                    </button>
                    {/* Progress bar for auto-hide */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: 0 }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-[2px] bg-[#C6A75E]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
