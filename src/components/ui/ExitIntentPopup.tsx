"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Check if already triggered in this session
        const hasTriggered = sessionStorage.getItem('tanishtra-exit-intent-shown');
        if (hasTriggered) return;

        let mobileTimer: NodeJS.Timeout;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 10) {
                showModal();
            }
        };

        const showModal = () => {
            setIsVisible(true);
            sessionStorage.setItem('tanishtra-exit-intent-shown', 'true');
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (mobileTimer) clearTimeout(mobileTimer);
        };

        // Desktop Event
        if (window.innerWidth >= 768) {
            document.addEventListener('mouseleave', handleMouseLeave);
        } else {
            // Mobile Fallback: Timer
            mobileTimer = setTimeout(showModal, 15000);
        }

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (mobileTimer) clearTimeout(mobileTimer);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText("WELCOME10");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-[#0B0B0D]/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: -20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-[800px] bg-[#16161B] border border-[#1F1F25] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 z-10 text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#0B0B0D]/50 rounded-full p-1"
                    >
                        <X size={20} />
                    </button>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 aspect-square md:aspect-auto hidden md:block">
                        <img
                            src="https://images.unsplash.com/photo-1629814434298-6ce0af31a980?auto=format&fit=crop&q=80&w=800"
                            alt="Luxury chains"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-left bg-[#16161B]">
                        {!isSubmitted ? (
                            <>
                                <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] font-bold mb-4 block">
                                    WAIT BEFORE YOU GO
                                </span>
                                <h2 className="font-playfair text-[32px] md:text-[40px] text-[#F5F5F7] leading-tight mb-4">
                                    Unlock 10% Off Your First Order
                                </h2>
                                <p className="font-inter text-[#A1A1AA] text-[15px] mb-8 leading-relaxed">
                                    Join the Tanishtra club. Get priority access to new drops, exclusive sales, and a special discount today.
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B73]" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-[52px] bg-[#0B0B0D] border border-[#2A2A2F] text-[#F5F5F7] pl-12 pr-4 font-inter text-[15px] focus:outline-none focus:border-[#C6A75E] transition-colors rounded-none placeholder:text-[#6B6B73]"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full h-[52px] bg-[#C6A75E] text-[#0B0B0D] font-montserrat text-[14px] uppercase font-bold tracking-[2px] flex items-center justify-center gap-2 hover:bg-[#D8B76A] transition-colors"
                                    >
                                        CLAIM MY 10% OFF
                                        <ArrowRight size={18} />
                                    </button>
                                </form>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="mt-6 font-inter text-[13px] text-[#6B6B73] hover:text-[#A1A1AA] transition-colors underline underline-offset-4"
                                >
                                    No thanks, I prefer paying full price
                                </button>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col h-full justify-center"
                            >
                                <span className="font-montserrat text-[12px] uppercase text-[#4A7C59] tracking-[3px] font-bold mb-4 block">
                                    SUCCESS!
                                </span>
                                <h2 className="font-playfair text-[32px] md:text-[40px] text-[#F5F5F7] leading-tight mb-4">
                                    Welcome to the Club.
                                </h2>
                                <p className="font-inter text-[#A1A1AA] text-[15px] mb-8 leading-relaxed">
                                    Use the code below at checkout to instantly save 10% on your entire order.
                                </p>

                                <div
                                    onClick={copyCode}
                                    className="w-full h-[64px] bg-[#0B0B0D] border-2 border-dashed border-[#C6A75E] text-[#C6A75E] font-montserrat text-[24px] uppercase font-bold tracking-[4px] flex items-center justify-center cursor-pointer hover:bg-[#C6A75E]/5 transition-colors group relative"
                                >
                                    {copied ? 'COPIED!' : 'WELCOME10'}
                                    {!copied && (
                                        <div className="absolute top-[-30px] opacity-0 group-hover:opacity-100 transition-opacity bg-[#2A2A2F] text-white text-[10px] py-1 px-2 rounded">
                                            Click to copy
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="mt-8 bg-transparent border border-[#2A2A2F] text-[#F5F5F7] font-montserrat text-[13px] uppercase font-bold tracking-[1px] h-[48px] hover:border-[#C6A75E] transition-colors"
                                >
                                    CONTINUE SHOPPING
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
