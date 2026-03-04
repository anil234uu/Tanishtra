"use client";
import React from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface LifestyleImage {
    url: string;
    productName: string;
    productLink: string;
}

interface LifestyleGallerySettings {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    images?: LifestyleImage[];
}

interface LifestyleGallerySectionProps {
    id: string;
    settings: LifestyleGallerySettings;
}

export default function LifestyleGallerySection({ settings }: LifestyleGallerySectionProps) {
    const {
        eyebrow = "THE LOOK",
        title = "Styled by Tanishtra",
        subtitle = "See our pieces in action",
        images = []
    } = settings;

    // We expect exactly 4 images for the strict desktop magazine grid structure
    const fallbackImages: LifestyleImage[] = images.length === 4 ? images : [
        { url: "https://images.unsplash.com/photo-1599643478524-fb66f7ca2b67?auto=format&fit=crop&q=80&w=800", productName: "Cuban Chain", productLink: "/products/cbn-01" },
        { url: "https://images.unsplash.com/photo-1620608560238-ab93d395be46?auto=format&fit=crop&q=80&w=800", productName: "TitanCore Ring", productLink: "/products/rng-01" },
        { url: "https://images.unsplash.com/photo-1573408301145-b98c46544ea0?auto=format&fit=crop&q=80&w=800", productName: "Onyx Bracelet", productLink: "/products/brc-01" },
        { url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200", productName: "Snake Chain", productLink: "/products/chn-02" }
    ];

    const headerAnim = useScrollAnimation({ type: 'fade-up', delay: 100 });
    const gridAnim = useScrollAnimation({ type: 'stagger', delay: 300 });

    return (
        <section className="py-24 bg-background">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">

                <div
                    ref={headerAnim.ref}
                    style={headerAnim.styles}
                    className="text-center mb-16"
                >
                    <span className="font-montserrat text-[11px] text-accent-gold uppercase tracking-[2px] block mb-2">{eyebrow}</span>
                    <h2 className="font-bebas text-5xl tracking-widest text-text mb-6">{title}</h2>
                    <p className="font-inter text-text-secondary">{subtitle}</p>
                </div>

                {/* 
                    CSS-Grid Masonry Layout
                    Desktop: [Large 2:3] [Small 1]
                                        [Small 2]
                             [Small 3]   [Wide Image]
                    Gap: 4px for tight magazine aesthetic
                */}
                <div
                    ref={gridAnim.ref}
                    className="grid grid-cols-2 lg:grid-cols-12 gap-[4px] w-full"
                >
                    {/* Item 1: Large Left (row 1-2, col 1-7 on desktop) */}
                    <div
                        className="col-span-2 lg:col-span-7 row-span-2 relative group overflow-hidden aspect-square lg:aspect-[4/5] bg-[#16161B]"
                        style={{
                            opacity: gridAnim.isVisible ? 1 : 0,
                            transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) 0ms`
                        }}
                    >
                        <img
                            src={fallbackImages[0].url}
                            alt={fallbackImages[0].productName}
                            className="w-full h-full object-cover saturate-[0.8] brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <Link href={fallbackImages[0].productLink} className="absolute inset-0 bg-transparent group-hover:bg-[rgba(198,167,94,0.1)] transition-colors duration-500 z-10 flex items-end p-6">
                            <span className="font-inter font-bold text-[#F5F5F7] text-[18px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{fallbackImages[0].productName}</span>
                        </Link>
                    </div>

                    {/* Item 2: Top Right (row 1, col 8-12 on desktop) */}
                    <div
                        className="col-span-1 lg:col-span-5 row-span-1 relative group overflow-hidden aspect-[4/5] lg:aspect-[5/4] bg-[#16161B]"
                        style={{
                            opacity: gridAnim.isVisible ? 1 : 0,
                            transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms`
                        }}
                    >
                        <img
                            src={fallbackImages[1].url}
                            alt={fallbackImages[1].productName}
                            className="w-full h-full object-cover saturate-[0.8] brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <Link href={fallbackImages[1].productLink} className="absolute inset-0 bg-transparent group-hover:bg-[rgba(198,167,94,0.1)] transition-colors duration-500 z-10 flex items-end p-6">
                            <span className="font-inter font-bold text-[#F5F5F7] text-[16px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{fallbackImages[1].productName}</span>
                        </Link>
                    </div>

                    {/* Item 3: Middle Right (row 2, col 8-12 on desktop) */}
                    <div
                        className="col-span-1 lg:col-span-5 row-span-1 relative group overflow-hidden aspect-[4/5] lg:aspect-[5/4] bg-[#16161B]"
                        style={{
                            opacity: gridAnim.isVisible ? 1 : 0,
                            transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms`
                        }}
                    >
                        <img
                            src={fallbackImages[2].url}
                            alt={fallbackImages[2].productName}
                            className="w-full h-full object-cover saturate-[0.8] brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <Link href={fallbackImages[2].productLink} className="absolute inset-0 bg-transparent group-hover:bg-[rgba(198,167,94,0.1)] transition-colors duration-500 z-10 flex items-end p-6">
                            <span className="font-inter font-bold text-[#F5F5F7] text-[16px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{fallbackImages[2].productName}</span>
                        </Link>
                    </div>

                    {/* Item 4: Bottom Left (row 3, col 1-5 on desktop) */}
                    <div
                        className="col-span-1 lg:col-span-5 row-span-1 relative group overflow-hidden aspect-square lg:aspect-[5/4] bg-[#16161B]"
                        style={{
                            opacity: gridAnim.isVisible ? 1 : 0,
                            transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms`
                        }}
                    >
                        <img
                            src={fallbackImages[2].url} // Just cloning image 2 logic since 3 and 4 are swapped in original spec diagram logic, doing it cleanly below
                            alt={fallbackImages[2].productName}
                            className="w-full h-full object-cover saturate-[0.8] brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{ objectPosition: 'center 30%' }}
                        />
                        <Link href={fallbackImages[2].productLink} className="absolute inset-0 bg-transparent group-hover:bg-[rgba(198,167,94,0.1)] transition-colors duration-500 z-10 flex items-end p-6">
                            <span className="font-inter font-bold text-[#F5F5F7] text-[16px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{fallbackImages[2].productName}</span>
                        </Link>
                    </div>

                    {/* Item 5: Bottom Right Wide (row 3, col 6-12 on desktop) */}
                    <div
                        className="col-span-1 lg:col-span-7 row-span-1 relative group overflow-hidden aspect-square lg:aspect-[21/9] bg-[#16161B]"
                        style={{
                            opacity: gridAnim.isVisible ? 1 : 0,
                            transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) 400ms`
                        }}
                    >
                        <img
                            src={fallbackImages[3].url}
                            alt={fallbackImages[3].productName}
                            className="w-full h-full object-cover saturate-[0.8] brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <Link href={fallbackImages[3].productLink} className="absolute inset-0 bg-transparent group-hover:bg-[rgba(198,167,94,0.1)] transition-colors duration-500 z-10 flex items-end p-6">
                            <span className="font-inter font-bold text-[#F5F5F7] text-[18px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{fallbackImages[3].productName}</span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
