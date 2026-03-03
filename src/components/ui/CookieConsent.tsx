"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('tanishtra-cookie-consent');
        if (!consent) {
            // Delay slightly so it doesn't pop immediately on load
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('tanishtra-cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:max-w-sm bg-background-card border-t md:border border-border z-[1000] p-4 md:rounded-lg shadow-dark md:px-6 md:py-5 pb-[80px] md:pb-5">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-montserrat text-sm uppercase text-text tracking-[1px] font-bold">Cookie Policy</h4>
                <button onClick={() => setIsVisible(false)} className="text-text-muted hover:text-text transition-colors">
                    <X size={16} />
                </button>
            </div>
            <p className="font-inter text-xs text-text-muted leading-relaxed mb-4">
                We use cookies for the best experience. By continuing to browse, you agree to our policies.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={acceptCookies}
                    className="bg-accent-gold text-background px-4 py-2 font-montserrat text-[11px] uppercase tracking-[1px] font-bold rounded flex-1 hover:bg-accent-gold-light transition-colors"
                >
                    Accept
                </button>
                <Link
                    href="/terms"
                    onClick={() => setIsVisible(false)}
                    className="border border-border text-text px-4 py-2 font-montserrat text-[11px] uppercase tracking-[1px] font-bold rounded flex-1 text-center hover:border-accent-gold transition-colors"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
}
