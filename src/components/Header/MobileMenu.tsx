"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';

export function MobileMenu() {
    const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    return (
        <div
            className={`fixed inset-0 z-[1100] bg-background/97 backdrop-blur-sm transition-all duration-400 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-full pointer-events-none'
                }`}
        >
            <div className="flex justify-between items-center p-6 border-b border-border">
                <span className="font-bebas text-[22px] tracking-[4px] text-accent-gold select-none">TANISHTRA</span>
                <button
                    onClick={closeMobileMenu}
                    className="text-accent-gold hover:text-text transition-colors p-2"
                    aria-label="Close menu"
                >
                    <X size={28} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col items-center text-center">
                <ul className="flex flex-col gap-6 w-full max-w-sm mb-10">
                    <li><Link href="/" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">HOME</Link></li>
                    <li><Link href="/collections/chain" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">CHAINS</Link></li>
                    <li><Link href="/collections/locket-chain" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">LOCKET & CHAIN</Link></li>
                    <li><Link href="/collections/bracelet" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">BRACELETS</Link></li>
                    <li><Link href="/collections/kada" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">KADA</Link></li>
                    <li><Link href="/collections/ring" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">RINGS</Link></li>
                    <div className="w-full h-[1px] bg-border my-2"></div>
                    <li><Link href="/collections/bestsellers" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-accent-gold hover:text-text transition-colors block">BESTSELLERS</Link></li>
                    <li><Link href="/collections/new-arrivals" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-accent-gold hover:text-text transition-colors block">NEW ARRIVALS</Link></li>
                    <div className="w-full h-[1px] bg-border my-2"></div>
                    <li><Link href="/about" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">ABOUT TANISHTRA</Link></li>
                    <li><Link href="/contact" onClick={closeMobileMenu} className="font-bebas text-[42px] uppercase tracking-widest text-text hover:text-accent-gold transition-colors block">CONTACT</Link></li>
                </ul>

                {/* Gold Divider */}
                <div className="w-16 h-[2px] bg-accent-gold mb-10 mx-auto"></div>

                <ul className="flex flex-col gap-4 mb-16">
                    <li><Link href="/shipping-policy" onClick={closeMobileMenu} className="font-inter text-[16px] text-text-muted hover:text-accent-gold transition-colors block">Shipping Policy</Link></li>
                    <li><Link href="/return-policy" onClick={closeMobileMenu} className="font-inter text-[16px] text-text-muted hover:text-accent-gold transition-colors block">Return Policy</Link></li>
                    <li><Link href="/terms" onClick={closeMobileMenu} className="font-inter text-[16px] text-text-muted hover:text-accent-gold transition-colors block">Terms & Conditions</Link></li>
                </ul>

                <div className="mt-auto pt-6 flex gap-8">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                        <Instagram size={28} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                        <Facebook size={28} />
                    </a>
                    <a href="https://wa.me/919594700173" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                        <MessageCircle size={28} />
                    </a>
                </div>
            </div>
        </div>
    );
}
