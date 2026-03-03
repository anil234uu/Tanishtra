"use client";
import React from 'react';
import Link from 'next/link';

export function TitanSeries() {
    return (
        <section className="bg-background-secondary pt-0 w-full">
            {/* Collection Hero Banner */}
            <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden flex items-center justify-center">
                {/* Ken Burns Background */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629814434298-6ce0af31a980?auto=format&fit=crop&q=80&w=1920)' }}
                />
                <div className="absolute inset-0 bg-background/60" /> {/* Dark overlay for readability */}

                {/* Centered Spotlight Effect (CSS Radial Gradient) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,167,94,0.15)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative z-10 max-w-[700px] w-full px-4 text-center flex flex-col items-center">
                    <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">
                        NEW COLLECTION — 2026
                    </span>
                    <h2 className="font-bebas text-[40px] md:text-[64px] tracking-[5px] text-text mb-4">
                        The Titan Series
                    </h2>
                    <p className="font-inter text-[18px] text-text-secondary mb-8 leading-snug">
                        Engineered for presence.<br />
                        Built for everyday dominance.
                    </p>
                    <Link
                        href="/collections/titan-series"
                        className="inline-block bg-accent-gold text-background hover:bg-accent-gold-light active:bg-accent-gold transition-colors font-montserrat text-[14px] uppercase font-bold px-[36px] py-[16px] rounded-[4px]"
                    >
                        EXPLORE TITAN SERIES
                    </Link>
                </div>
            </div>

            <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>

            {/* Feature Products */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-[60px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    {/* Card 1 */}
                    <Link href="/products/p3" className="group block relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden border border-border">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=800)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 md:via-background/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 border-b-[3px] border-transparent group-hover:border-accent-gold transition-colors duration-400 flex flex-col justify-end">
                            <h3 className="font-playfair text-[24px] md:text-[28px] text-white leading-tight mb-2">
                                TitanCore Ring<br className="hidden md:block" /> For Men (Silver)
                            </h3>
                            <p className="font-inter text-[14px] italic text-text-secondary mb-4">
                                Precision-crafted. Minimal yet powerful.
                            </p>
                            <span className="font-montserrat text-[20px] font-bold text-accent-gold mb-2 block">
                                ₹499
                            </span>

                            <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-400 ease-in-out">
                                <span className="font-montserrat text-[12px] uppercase tracking-[1px] text-text font-bold flex items-center gap-1">
                                    SHOP NOW <span className="text-accent-gold">&rarr;</span>
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link href="/products/p9" className="group block relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden border border-border">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=800)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 md:via-background/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 border-b-[3px] border-transparent group-hover:border-accent-gold transition-colors duration-400 flex flex-col justify-end">
                            <h3 className="font-playfair text-[24px] md:text-[28px] text-white leading-tight mb-2">
                                Eternum Ceramic<br className="hidden md:block" /> Ring For Men (Golden)
                            </h3>
                            <p className="font-inter text-[14px] italic text-text-secondary mb-4">
                                Forged with ceramic. Built to last forever.
                            </p>
                            <span className="font-montserrat text-[20px] font-bold text-accent-gold mb-2 block">
                                ₹699
                            </span>

                            <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-400 ease-in-out">
                                <span className="font-montserrat text-[12px] uppercase tracking-[1px] text-text font-bold flex items-center gap-1">
                                    SHOP NOW <span className="text-accent-gold">&rarr;</span>
                                </span>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
