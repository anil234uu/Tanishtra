"use client";
import React from 'react';
import Link from 'next/link';

interface FeaturedProduct {
    name: string;
    tagline: string;
    price: number;
    image: string;
    link: string;
}

interface SectionProps {
    id: string;
    settings: {
        eyebrow?: string;
        collectionName?: string;
        tagline?: string;
        backgroundImage?: string;
        ctaText?: string;
        ctaLink?: string;
        featuredProducts?: FeaturedProduct[];
    }
}

export default function CollectionBannerSection({ id, settings }: SectionProps) {
    return (
        <section id={id} className={`bg-background-secondary pt-0 w-full`}>
            {/* Collection Hero Banner */}
            <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden flex items-center justify-center">
                {/* Ken Burns Background */}
                {settings.backgroundImage && (
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
                        style={{ backgroundImage: `url('${settings.backgroundImage}')` }}
                    />
                )}
                <div className="absolute inset-0 bg-background/60" /> {/* Dark overlay for readability */}

                {/* Centered Spotlight Effect (CSS Radial Gradient) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,167,94,0.15)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative z-10 max-w-[700px] w-full px-4 text-center flex flex-col items-center">
                    {settings.eyebrow && (
                        <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">
                            {settings.eyebrow}
                        </span>
                    )}
                    {settings.collectionName && (
                        <h2 className="font-bebas text-[40px] md:text-[64px] tracking-[5px] text-text mb-4 whitespace-pre-line">
                            {settings.collectionName}
                        </h2>
                    )}
                    {settings.tagline && (
                        <p className="font-inter text-[18px] text-text-secondary mb-8 leading-snug whitespace-pre-line">
                            {settings.tagline}
                        </p>
                    )}
                    {settings.ctaText && settings.ctaLink && (
                        <Link
                            href={settings.ctaLink}
                            className="inline-block bg-accent-gold text-background hover:bg-accent-gold-light active:bg-accent-gold transition-colors font-montserrat text-[14px] uppercase font-bold px-[36px] py-[16px] rounded-[4px]"
                        >
                            {settings.ctaText}
                        </Link>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes kenBurns {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
            `}</style>

            {/* Feature Products */}
            {settings.featuredProducts && settings.featuredProducts.length > 0 && (
                <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-[60px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {settings.featuredProducts.map((product, index) => (
                            <Link key={index} href={product.link} className="group block relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden border border-border">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                    style={{ backgroundImage: `url('${product.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 md:via-background/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 border-b-[3px] border-transparent group-hover:border-accent-gold transition-colors duration-400 flex flex-col justify-end">
                                    <h3 className="font-playfair text-[24px] md:text-[28px] text-white leading-tight mb-2 whitespace-pre-line">
                                        {product.name}
                                    </h3>
                                    <p className="font-inter text-[14px] italic text-text-secondary mb-4">
                                        {product.tagline}
                                    </p>
                                    <span className="font-montserrat text-[20px] font-bold text-accent-gold mb-2 block">
                                        ₹{product.price}
                                    </span>

                                    <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-400 ease-in-out">
                                        <span className="font-montserrat text-[12px] uppercase tracking-[1px] text-text font-bold flex items-center gap-1">
                                            SHOP NOW <span className="text-accent-gold">&rarr;</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
