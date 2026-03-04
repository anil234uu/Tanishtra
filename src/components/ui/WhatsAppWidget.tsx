"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppWidget() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Slight delay before showing
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-[80px] md:bottom-6 right-4 md:right-6 z-[900] flex flex-col items-end group">
            {/* Tooltip */}
            <div className="mb-3 px-4 py-2 bg-background-secondary border border-border text-text font-inter text-[13px] rounded-lg shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap hidden pointer-events-none md:block">
                Need help? Chat with us
            </div>

            {/* Button */}
            <a
                href="https://wa.me/919594700173?text=Hi!%20I'm%20interested%20in%20Tanishtra%20accessories."
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center p-3 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.4)]"
                aria-label="Chat on WhatsApp"
            >
                {/* Pulsing rings */}
                <span className="absolute w-full h-full rounded-full border-2 border-[#25D366] animate-ping opacity-75 hidden md:block"></span>
                <span className="absolute w-[120%] h-[120%] rounded-full border border-[#25D366] opacity-30 animate-[spin_4s_linear_infinite] hidden md:block"></span>

                <MessageCircle size={30} className="relative z-10" />
            </a>
        </div>
    );
}
