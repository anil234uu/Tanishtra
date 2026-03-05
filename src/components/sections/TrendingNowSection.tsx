"use client";
import React, { useEffect, useState } from 'react';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import productsDataRaw from '../../../data/products.json';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TrendingNowSectionProps {
    settings: {
        title?: string;
        subtitle?: string;
    }
}

export default function TrendingNowSection({ settings }: TrendingNowSectionProps) {
    const [trending, setTrending] = useState<Product[]>([]);

    useEffect(() => {
        // Since we don't have a real backend, we simulate trending
        // by grabbing bestsellers and randomizing them
        const matches = (productsDataRaw as Product[]).filter(p => p.isBestseller);
        const shuffled = [...matches].sort(() => 0.5 - Math.random());
        setTrending(shuffled.slice(0, 4));
    }, []);

    const headerAnim = useScrollAnimation({ type: 'fade-up' });
    const gridAnim = useScrollAnimation({ type: 'stagger', delay: 100 });

    if (trending.length === 0) return null;

    return (
        <section className="py-20 md:py-24 bg-background">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
                {/* Header */}
                <div
                    ref={headerAnim.ref}
                    style={headerAnim.styles}
                    className="mb-12 text-center"
                >
                    <h2 className="font-playfair text-[32px] md:text-[42px] text-[#F5F5F7] mb-3 leading-tight">
                        {settings.title || "Trending Now"}
                    </h2>
                    <p className="font-inter text-[15px] text-[#A1A1AA]">
                        {settings.subtitle || "What everyone's adding to their bag"}
                    </p>
                </div>

                {/* Grid */}
                <div
                    ref={gridAnim.ref}
                    style={gridAnim.styles}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {trending.map((product, idx) => (
                        <div
                            key={product.id}
                            style={{
                                opacity: gridAnim.isVisible ? 1 : 0,
                                transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`
                            }}
                        >
                            <ProductCard product={product} variant="bestseller" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
