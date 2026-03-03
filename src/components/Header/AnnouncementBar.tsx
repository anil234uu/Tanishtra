"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem('tanishtra-announcement-dismissed');
        if (!dismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem('tanishtra-announcement-dismissed', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-[36px] bg-accent-gold z-[1200] flex items-center justify-center px-4">
            <div className="w-full relative flex items-center justify-center overflow-hidden h-full">
                {/* We use a mask on mobile to fade the edges for marquee */}
                <div className="w-full max-w-[1320px] flex items-center justify-center relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:none]">
                    <p className="font-montserrat text-[12px] uppercase tracking-[2px] text-background font-bold whitespace-nowrap animate-[marquee_15s_linear_infinite] md:animate-none">
                        FREE SHIPPING ON ORDERS ABOVE ₹999 • COD AVAILABLE PAN-INDIA
                    </p>
                </div>

                <button
                    onClick={handleDismiss}
                    className="absolute right-0 md:bg-transparent bg-accent-gold pl-2 text-background hover:text-background-secondary transition-colors"
                    aria-label="Dismiss announcement"
                >
                    <X size={16} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
