"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SectionProps {
    id: string;
    settings: {
        eyebrow?: string;
        headline?: string;
        body?: string;
        backgroundImage?: string;
        ctaText?: string;
        ctaLink?: string;
        parallax?: boolean;
        alignment?: string;
    };
}

export default function EditorialBannerSection({ id, settings }: SectionProps) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (!settings.parallax) return;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [settings.parallax]);

    // Parse the body assuming "\n\n" divides paragraphs
    const paragraphs = settings.body ? settings.body.split('\n\n') : [];

    const isCenter = settings.alignment === 'center';
    const isRight = settings.alignment === 'right';

    return (
        <section id={id} className={`relative w-full h-auto min-h-[60vh] md:h-[80vh] overflow-hidden flex items-center ${isCenter ? 'justify-center text-center' : isRight ? 'justify-end text-right' : 'justify-start text-left'}`}>

            {/* Parallax Background */}
            {settings.backgroundImage && (
                <div
                    className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(${settings.backgroundImage})`,
                        transform: settings.parallax ? `translateY(${scrollY * 0.3}px)` : 'none'
                    }}
                />
            )}

            {/* Cinematic Overlays */}
            <div className={`absolute inset-0 z-10 ${isCenter ? 'bg-black/60' : isRight ? 'bg-gradient-to-t md:bg-gradient-to-l from-background/95 md:from-background/90 via-background/50 md:via-background/70 to-transparent md:to-background/0' : 'bg-gradient-to-t md:bg-gradient-to-r from-background/95 md:from-background/90 via-background/50 md:via-background/70 to-transparent md:to-background/0'}`} />

            {/* Content */}
            <div className="relative z-20 w-full max-w-[1320px] mx-auto px-4 md:px-8">
                <div className={`max-w-[560px] py-[32px] md:py-[60px] ${isCenter ? 'mx-auto' : ''}`}>
                    {settings.eyebrow && (
                        <span className={`font-montserrat text-[12px] uppercase text-accent-gold tracking-[3px] block mb-4 md:mb-6 ${isCenter ? 'mx-auto w-fit' : ''}`}>
                            {settings.eyebrow}
                        </span>
                    )}

                    {settings.headline && (
                        <h2 className="font-playfair text-[32px] md:text-[48px] text-text leading-tight mb-6 md:mb-8 whitespace-pre-line">
                            {settings.headline}
                        </h2>
                    )}

                    {paragraphs.length > 0 && (
                        <div className="mb-8 font-inter text-[16px] text-text-secondary leading-[1.7]">
                            {paragraphs.map((p, i) => (
                                <p key={i} className={i !== 0 ? 'mt-4' : ''}>
                                    {p}
                                </p>
                            ))}
                        </div>
                    )}

                    {settings.ctaText && settings.ctaLink && (
                        <Link
                            href={settings.ctaLink}
                            className={`group font-montserrat text-[14px] uppercase text-accent-gold font-bold flex items-center gap-2 hover:text-accent-gold-light transition-colors relative inline-block ${isCenter ? 'justify-center mx-auto' : ''}`}
                        >
                            {settings.ctaText.replace('→', '').replace('rarr', '').trim()}
                            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    )}
                </div>
            </div>

        </section>
    );
}
