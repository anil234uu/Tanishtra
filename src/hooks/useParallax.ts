"use client";
import { useEffect, useState } from 'react';

/**
 * useParallax
 * Calculates a throttled offset for background Y positions to create depth illusions.
 * 
 * @param speed - Multiplier for scroll distance (e.g. 0.3 for slower bg, 1.5 for faster)
 * @param disabledOnMobile - To conserve performance & battery, often parallax is disabled < 768px
 * @returns { transform: string } - The CSS transform rule to apply
 */
export function useParallax(speed: number = 0.3, disabledOnMobile: boolean = true) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        // Media query check to optionally kill parallax on mobile views
        if (disabledOnMobile && window.innerWidth <= 768) {
            return;
        }

        // Ticking optimization ensures we only fire on animation frames, not arbitrary scroll increments
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setOffsetY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Run once on load to get initial position if page refreshed part-way down
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [disabledOnMobile]);

    // Use translate3d to enforce hardware GPU acceleration
    // We negative compute the offset if speed < 1 to move slower relative to parent scroll
    const yPx = offsetY * speed;

    return {
        transform: `translate3d(0, ${yPx}px, 0)`,
        transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smoothing jitter
    };
}
