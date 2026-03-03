"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`fixed bottom-[140px] md:bottom-24 right-4 md:right-6 z-[800] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-accent-gold text-background rounded-full shadow-dark flex items-center justify-center hover:bg-accent-gold-light hover:-translate-y-1 transition-all"
                aria-label="Back to top"
            >
                <ArrowUp size={20} strokeWidth={3} />
            </button>
        </div>
    );
}
