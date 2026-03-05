"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecentlyViewed } from '@/lib/store/useRecentlyViewed';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface RecentlyViewedProps {
    currentProductId?: string;
    title?: string;
}

export function RecentlyViewed({ currentProductId, title = "Recently Viewed" }: RecentlyViewedProps) {
    const { items } = useRecentlyViewed();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll Animation
    const headerAnim = useScrollAnimation({ type: 'fade-up' });
    const carouselAnim = useScrollAnimation({ type: 'fade-up', delay: 100 });

    if (!mounted) return null;

    // Filter out the current product from being displayed
    const displayItems = items.filter(item => item.id !== currentProductId);

    // Only show if user has viewed 2+ OTHER products
    if (displayItems.length < 2) return null;

    return (
        <section className="py-16 md:py-24 bg-background border-t border-border">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">

                {/* Header (Clean, no eyebrow) */}
                <div
                    ref={headerAnim.ref}
                    style={headerAnim.styles}
                    className="mb-8"
                >
                    <h2 className="font-inter text-[20px] font-bold text-[#F5F5F7]">
                        {title}
                    </h2>
                </div>

            </div>

            {/* Horizontal Scroll Strip */}
            <div
                ref={carouselAnim.ref}
                style={carouselAnim.styles}
                className="pl-4 sm:pl-8 max-w-[1400px] mx-auto"
            >
                <div className="flex gap-4 overflow-x-auto pb-6 pr-4 sm:pr-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                    {displayItems.map((product) => (
                        <Link
                            key={product.id}
                            href={product.slug}
                            className="snap-start shrink-0 w-[200px] group bg-[#16161B] rounded-[8px] border border-[#1F1F25] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[rgba(198,167,94,0.4)]"
                        >
                            <div className="aspect-square bg-[#0F0F12] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-3">
                                <span className="block font-montserrat text-[10px] text-[#6B6B73] uppercase mb-1">{product.category}</span>
                                <h3 className="font-inter text-[14px] text-[#F5F5F7] truncate mb-1" title={product.name}>{product.name}</h3>
                                <div className="font-inter text-[14px] font-bold text-[#C6A75E]">₹{product.price.toLocaleString('en-IN')}</div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}
