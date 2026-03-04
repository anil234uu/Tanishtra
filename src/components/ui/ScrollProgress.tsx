"use client";
import React, { useEffect, useState } from 'react';

export function ScrollProgress() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollPercentage(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-accent-gold to-accent-gold-hover z-[10000] transition-[width] duration-100 ease-linear"
            style={{ width: `${scrollPercentage}%` }}
        />
    );
}
