"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

export function BestsellersCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const bestsellers: Product[] = [
        {
            id: "b1",
            name: "Cuban Chain For Men (Black)",
            price: 699,
            originalPrice: 1899,
            category: "Chain",
            image: "https://images.unsplash.com/photo-1599643477874-ceade8ea205f?auto=format&fit=crop&q=80&w=800",
            isBestseller: true,
            rating: 4.8,
            reviews: 127
        },
        {
            id: "b2",
            name: "Snake Chain For Men (Silver)",
            price: 599,
            originalPrice: 1599,
            category: "Chain",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
            isBestseller: true,
            rating: 4.9,
            reviews: 84
        },
        {
            id: "b3",
            name: "TitanCore Ring For Men (Silver)",
            price: 499,
            originalPrice: 1299,
            category: "Ring",
            image: "https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=800",
            isBestseller: true,
            rating: 4.7,
            reviews: 312
        },
        {
            id: "b4",
            name: "Lava, Rudraksha And Blue Turquoise Bracelet",
            price: 799,
            originalPrice: 1999,
            category: "Bracelet",
            image: "https://images.unsplash.com/photo-1573408301145-b98c46544ea0?auto=format&fit=crop&q=80&w=800",
            isBestseller: true,
            rating: 4.6,
            reviews: 92
        }
    ];

    return (
        <section className="py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="font-montserrat text-[11px] text-accent-gold uppercase tracking-[2px] block mb-2">Most Wanted</span>
                        <h2 className="font-bebas text-5xl tracking-widest text-text">BESTSELLERS</h2>
                    </div>
                    <Link href="/bestsellers" className="hidden sm:inline-flex font-montserrat text-[11px] uppercase tracking-[2px] text-text-muted hover:text-accent-gold transition-colors items-center gap-2">
                        View All →
                    </Link>
                </div>
            </div>

            {/* Full bleed mobile scroll */}
            <div className="pl-4 sm:pl-8 max-w-[1400px] mx-auto">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 pr-4 sm:pr-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {bestsellers.map((product) => (
                        <div key={product.id} className="snap-start shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
