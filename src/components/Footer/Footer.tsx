import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background border-t border-border mt-auto">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10 md:py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">

                    {/* COLUMN 1 — BRAND */}
                    <div className="flex flex-col">
                        <Link href="/" className="inline-block">
                            <span className="font-bebas text-3xl tracking-[4px] text-accent-gold">TANISHTRA</span>
                        </Link>
                        <p className="font-inter text-[13px] text-text-muted mt-2 max-w-xs">
                            Crafted for Men Who Command Presence
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://wa.me/919594700173" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2 — SHOP */}
                    <div className="flex flex-col">
                        <h3 className="font-montserrat text-[13px] uppercase text-accent-gold tracking-[2px] mb-6">SHOP</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/collections/chain" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Chain</Link></li>
                            <li><Link href="/collections/locket-chain" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Locket & Chain</Link></li>
                            <li><Link href="/collections/bracelet" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Bracelet</Link></li>
                            <li><Link href="/collections/kada" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Kada</Link></li>
                            <li><Link href="/collections/ring" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Ring</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 3 — SUPPORT */}
                    <div className="flex flex-col">
                        <h3 className="font-montserrat text-[13px] uppercase text-text mb-6 tracking-[2px]">SUPPORT</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/shipping-policy" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/return-policy" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Return Policy</Link></li>
                            <li><Link href="/terms" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/faq" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 4 — CONTACT */}
                    <div className="flex flex-col">
                        <h3 className="font-montserrat text-[13px] uppercase text-text mb-6 tracking-[2px]">CONTACT</h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a href="tel:+919594700173" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">
                                    +91 9594700173
                                </a>
                            </li>
                            <li>
                                <a href="mailto:tanishtra@gmail.com" className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">
                                    tanishtra@gmail.com
                                </a>
                            </li>
                            <li>
                                <span className="font-inter text-sm text-text-secondary block mt-1">
                                    Goregaon West, Mumbai<br />Maharashtra, India
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-[13px] text-text-muted">
                        &copy; 2026 Tanishtra. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                        <div className="h-[24px] w-[38px] bg-background-card rounded border border-border flex items-center justify-center text-[10px] font-bold">VISA</div>
                        <div className="h-[24px] w-[38px] bg-background-card rounded border border-border flex items-center justify-center text-[10px] font-bold">MC</div>
                        <div className="h-[24px] w-[38px] bg-background-card rounded border border-border flex items-center justify-center text-[10px] font-bold">UPI</div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
