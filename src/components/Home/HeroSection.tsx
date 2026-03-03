"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background with dark gradient overlay */}
            <div className="absolute inset-0 bg-background-secondary z-0">
                <img
                    src="https://images.unsplash.com/photo-1611004128522-bc5584852c04?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Men's Accessories"
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 flex flex-col justify-center items-center h-full pt-20 max-w-[1400px] mx-auto w-full">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] mb-4 font-bold"
                >
                    PREMIUM MEN'S ACCESSORIES
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="font-playfair text-[40px] md:text-[64px] leading-[1.1] tracking-[-0.01em] text-[#F5F5F7] mb-6 max-w-4xl"
                >
                    Crafted for Men Who Command Presence.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-inter text-[16px] md:text-[18px] text-[#A1A1AA] max-w-[460px] mx-auto mb-10 leading-relaxed"
                >
                    Premium chains, lockets, rings and bracelets designed for bold everyday style.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/collections"
                        className="bg-[#C6A75E] text-[#0B0B0D] font-montserrat text-[14px] uppercase font-bold tracking-[0.08em] px-[32px] py-[16px] rounded-[4px] border-none hover:bg-[#D8B76A] hover:-translate-y-[2px] transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center"
                    >
                        EXPLORE COLLECTION
                    </Link>
                    <Link
                        href="#bestsellers"
                        className="bg-transparent text-[#C6A75E] border border-[#C6A75E] font-montserrat text-[14px] uppercase font-bold tracking-[0.08em] px-[32px] py-[16px] rounded-[4px] hover:bg-[#C6A75E]/10 hover:-translate-y-[2px] transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center"
                    >
                        VIEW BESTSELLERS
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="font-inter text-[13px] text-[#6B6B73] mt-[24px]"
                >
                    ✦ Free Shipping ₹999+ &nbsp;•&nbsp; ✦ COD Available &nbsp;•&nbsp; ✦ Premium Finish
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-10 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent-gold to-transparent" />
                <span className="font-montserrat text-[9px] uppercase tracking-[2px] text-accent-gold">Scroll</span>
            </motion.div>
        </section>
    );
}
