"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { GoldParticles } from '../Home/GoldParticles';

interface SectionProps {
    id: string;
    settings: {
        eyebrow: string;
        emotionalHook: string;
        headline: string;
        subtitle: string;
        backgroundImage: string;
        primaryButtonText: string;
        primaryButtonLink: string;
        secondaryButtonText: string;
        secondaryButtonLink: string;
        trustStrip: string;
        showParticles: boolean;
        showScrollIndicator: boolean;
    };
}

export default function HeroSection({ id, settings }: SectionProps) {
    const { scrollY } = useScroll();
    const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    // Split text into words for stagger effect
    const headlineText = settings.headline || "Crafted for Men Who Command Presence.";
    const titleWords = headlineText.split(" ");

    return (
        <section id={id} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background with dark gradient overlay & Ken Burns */}
            <div className="absolute inset-0 bg-background-secondary z-0 overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center opacity-40 grayscale animate-[heroZoom_25s_ease-in-out_infinite_alternate]"
                    style={{ backgroundImage: `url('${settings.backgroundImage || 'https://images.unsplash.com/photo-1611004128522-bc5584852c04?q=80&w=2070&auto=format&fit=crop'}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent z-10" />
                {settings.showParticles && <GoldParticles />}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 flex flex-col justify-center items-center h-full pt-20 max-w-[1400px] mx-auto w-full">
                {settings.eyebrow && (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] mb-3 font-bold"
                    >
                        {settings.eyebrow}
                    </motion.span>
                )}

                {settings.emotionalHook && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="font-playfair text-[20px] italic text-[#A1A1AA] mb-6"
                    >
                        "{settings.emotionalHook}"
                    </motion.div>
                )}

                <div className="flex flex-wrap justify-center max-w-4xl mb-6">
                    {titleWords.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.3 + (index * 0.1),
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className={`font-playfair text-[40px] md:text-[64px] leading-[1.1] tracking-[-0.01em] text-[#F5F5F7] mr-3 ${word.includes('Presence') ? 'text-[#C6A75E] text-glow' : ''}`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                {settings.subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="font-inter text-[16px] md:text-[18px] text-[#A1A1AA] max-w-[460px] mx-auto mb-10 leading-relaxed"
                    >
                        {settings.subtitle}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {settings.primaryButtonText && settings.primaryButtonLink && (
                        <Link
                            href={settings.primaryButtonLink}
                            className="bg-[#C6A75E] text-[#0B0B0D] font-montserrat text-[14px] uppercase font-bold tracking-[0.08em] px-[32px] py-[16px] rounded-[4px] border-none hover:bg-[#D8B76A] hover:-translate-y-[2px] transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center"
                        >
                            {settings.primaryButtonText}
                        </Link>
                    )}
                    {settings.secondaryButtonText && settings.secondaryButtonLink && (
                        <Link
                            href={settings.secondaryButtonLink}
                            className="bg-transparent text-[#C6A75E] border border-[#C6A75E] font-montserrat text-[14px] uppercase font-bold tracking-[0.08em] px-[32px] py-[16px] rounded-[4px] hover:bg-[#C6A75E]/10 hover:-translate-y-[2px] transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center"
                        >
                            {settings.secondaryButtonText}
                        </Link>
                    )}
                </motion.div>

                {settings.trustStrip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 2.0 }}
                        className="font-inter text-[13px] text-[#6B6B73] mt-[28px]"
                    >
                        {settings.trustStrip.split('•').map((part, i) => (
                            <React.Fragment key={i}>
                                {part.trim()} {i < settings.trustStrip.split('•').length - 1 && <>&nbsp;&nbsp;•&nbsp;&nbsp;</>}
                            </React.Fragment>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Scroll Indicator */}
            {settings.showScrollIndicator && (
                <motion.div
                    style={{ opacity: scrollOpacity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <div className="animate-[bounce_2s_infinite] text-[#C6A75E] opacity-50 text-[24px]">
                        ▽
                    </div>
                    <span className="font-montserrat text-[10px] uppercase tracking-[3px] text-[#6B6B73]">SCROLL TO EXPLORE</span>
                </motion.div>
            )}
        </section>
    );
}
