"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppWidget() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Slight delay before showing
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <a
            href="https://wa.me/919594700173?text=Hi!%20I'm%20interested%20in%20Tanishtra%20accessories."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[80px] md:bottom-6 right-4 md:right-6 z-[900] bg-[#25D366] text-white p-3 rounded-full shadow-dark border-2 border-accent-gold hover:scale-110 transition-transform duration-300"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
}
