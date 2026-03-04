"use client";
import React, { useEffect, useState } from 'react';

export function GoldParticles() {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, duration: number, delay: number, size: number }>>([]);

    useEffect(() => {
        // Generate particles only on the client side to avoid hydration mismatch
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random percentage left
            duration: 15 + Math.random() * 15, // 15 to 30 seconds
            delay: Math.random() * 10,
            size: 2 + Math.random() * 2 // 2px to 4px
        }));
        setParticles(newParticles);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map(p => (
                <span
                    key={p.id}
                    className="absolute bottom-0 rounded-full bg-accent-gold"
                    style={{
                        left: `${p.x}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: 0,
                        animation: `floatParticle ${p.duration}s linear ${p.delay}s infinite`
                    }}
                />
            ))}
        </div>
    );
}
