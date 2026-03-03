"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function BrandStory() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative w-full h-auto min-h-[60vh] md:h-[80vh] overflow-hidden flex items-center">

            {/* Parallax Background */}
            <div
                className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1617331566373-d1ea2cb5dc2f?auto=format&fit=crop&q=80&w=1920)',
                    transform: `translateY(${scrollY * 0.3}px)`
                }}
            />

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-r from-background/95 md:from-background/90 via-background/50 md:via-background/70 to-transparent md:to-background/0" />

            {/* Content */}
            <div className="relative z-20 w-full max-w-[1320px] mx-auto px-4 md:px-8">
                <div className="max-w-[560px] py-[32px] md:py-[60px]">
                    <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[3px] block mb-4 md:mb-6">
                        THE TANISHTRA STORY
                    </span>
                    <h2 className="font-playfair text-[32px] md:text-[48px] text-text leading-tight mb-6 md:mb-8">
                        Not Just Accessories.<br />
                        Armor for the<br />
                        Modern Man.
                    </h2>
                    <p className="font-inter text-[16px] text-text-secondary leading-[1.7] mb-8">
                        In a world of mass-produced mediocrity, Tanishtra exists for men who understand that details define the man. Every chain we craft, every ring we forge — carries the weight of intention.
                        <br /><br />
                        Born in Mumbai. Designed for the man who leads.
                    </p>
                    <Link
                        href="/about"
                        className="group font-montserrat text-[14px] uppercase text-accent-gold font-bold flex items-center gap-2 hover:text-accent-gold-light transition-colors relative inline-block"
                    >
                        KNOW OUR STORY
                        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </div>
            </div>

        </section>
    );
}
