"use client";
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function SectionDivider() {
    const { ref, isVisible } = useScrollAnimation({ type: 'fade-in', threshold: 0.1 });

    return (
        <div
            ref={ref}
            className="w-full flex justify-center items-center py-10 md:py-16 bg-background"
        >
            <div
                className="h-[1px] mx-auto bg-gradient-to-r from-transparent via-[rgba(198,167,94,0.5)] to-transparent transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    width: isVisible ? '60%' : '0%',
                    maxWidth: '600px',
                    opacity: isVisible ? 1 : 0
                }}
            />
        </div>
    );
}
