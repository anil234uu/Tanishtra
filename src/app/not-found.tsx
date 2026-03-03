import React from 'react';
import Link from 'next/link';

export const metadata = { title: "Page Not Found | Tanishtra" };

export default function NotFound() {
    return (
        <div className="bg-background min-h-[80vh] flex items-center justify-center py-20 px-4">
            <div className="text-center max-w-md">
                <span className="font-bebas text-[120px] leading-none text-accent-gold mb-2 block animate-pulse">404</span>
                <h1 className="font-playfair text-3xl md:text-4xl text-text mb-4">You've gone off the map.</h1>
                <p className="font-inter text-text-secondary mb-8">
                    The page or product you're looking for has moved, been completely sold out, or doesn't exist.
                </p>
                <Link
                    href="/"
                    className="bg-accent-gold text-background font-montserrat text-[14px] uppercase tracking-[1px] font-bold px-8 py-4 rounded hover:bg-accent-gold-light transition-colors inline-block"
                >
                    Return to Base
                </Link>
            </div>
        </div>
    );
}
