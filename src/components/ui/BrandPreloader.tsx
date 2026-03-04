"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BrandPreloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only run preloader once per session
        const hasLoadedBefore = sessionStorage.getItem('tanishtra_preloaded');

        if (hasLoadedBefore) {
            setIsLoading(false);
            return;
        }

        // Run animation sequence then hide preloader and save token
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('tanishtra_preloaded', 'true');
        }, 1500); // 1.5s total preloader time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-[#0B0B0D] flex flex-col items-center justify-center h-screen w-screen"
                >
                    <div className="flex flex-col items-center justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-bebas text-[36px] tracking-[6px] text-[#C6A75E] mb-4"
                        >
                            TANISHTRA
                        </motion.h1>

                        {/* Expanding Gold Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 120 }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
