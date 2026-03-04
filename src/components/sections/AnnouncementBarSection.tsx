"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';

const FREE_SHIPPING_THRESHOLD = 999;

interface SectionProps {
    id: string;
    settings: {
        text: string;
        backgroundColor: string;
        textColor: string;
        dismissible: boolean;
    };
}

export default function AnnouncementBarSection({ id, settings }: SectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { items } = useCartStore();

    // Calculate cart subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        const dismissed = localStorage.getItem('tanishtra-announcement-dismissed');
        if (!settings.dismissible || !dismissed) {
            setIsVisible(true);
        }
    }, [settings.dismissible]);

    const handleDismiss = () => {
        if (settings.dismissible) {
            localStorage.setItem('tanishtra-announcement-dismissed', 'true');
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const isUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;

    return (
        <div id={id} className={`fixed top-0 left-0 right-0 h-[36px] z-[1200] flex flex-col justify-center transition-colors duration-500 ${isUnlocked ? 'bg-[#4A7C59]' : `bg-[${settings.backgroundColor || '#C6A75E'}]`}`} style={{ backgroundColor: isUnlocked ? '#4A7C59' : settings.backgroundColor || '#C6A75E' }}>
            <div className="w-full relative flex items-center justify-center overflow-hidden h-full px-4">
                {/* Dynamic Text Content */}
                <div className="w-full max-w-[1320px] flex items-center justify-center relative overflow-hidden z-[2]">
                    {subtotal === 0 ? (
                        <p className="font-montserrat text-[11px] md:text-[12px] uppercase tracking-[2px] font-bold text-center" style={{ color: settings.textColor || '#0B0B0D' }}>
                            {settings.text}
                        </p>
                    ) : isUnlocked ? (
                        <p className="font-montserrat text-[11px] md:text-[12px] uppercase tracking-[2px] text-white font-bold text-center animate-[pulse_2s_ease-in-out_infinite]">
                            🎉 YOU HAVE UNLOCKED FREE SHIPPING!
                        </p>
                    ) : (
                        <p className="font-montserrat text-[11px] md:text-[12px] uppercase tracking-[1px] md:tracking-[2px] font-bold text-center" style={{ color: settings.textColor || '#0B0B0D' }}>
                            YOU ARE <span className="font-bebas text-[14px] md:text-[16px] tracking-wider translate-y-[1px] inline-block">₹{remaining.toLocaleString('en-IN')}</span> AWAY FROM FREE SHIPPING!
                        </p>
                    )}
                </div>

                {settings.dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-[3] bg-transparent pl-2 text-background hover:opacity-70 transition-opacity"
                        aria-label="Dismiss announcement"
                        style={{ color: settings.textColor || '#0B0B0D' }}
                    >
                        <X size={16} strokeWidth={3} />
                    </button>
                )}
            </div>

            {/* Background Progress Bar (Subtle) */}
            {subtotal > 0 && !isUnlocked && (
                <div className="absolute top-0 left-0 bottom-0 bg-[rgba(255,255,255,0.3)] z-[1] transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
            )}
        </div>
    );
}
