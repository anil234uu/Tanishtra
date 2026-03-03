"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

const REAL_REVIEWS = [
    {
        quote: "This chain offers a good balance of style and comfort. The finish feels premium for the price. Wearing it daily and getting compliments everywhere.",
        name: "Varun",
        date: "27 Feb 2026"
    },
    {
        quote: "The look is clean and modern. Exactly what I wanted — something bold but not over the top. Quality exceeded my expectations at this price point.",
        name: "Suresh",
        date: "26 Feb 2026"
    },
    {
        quote: "Ordered the bracelet on a whim. Packaging was impressive, product was even better. Already eyeing the chain collection next. Tanishtra has a customer for life.",
        name: "Arjun",
        date: "24 Feb 2026"
    }
];

export function Bestsellers() {
    const [bestsellers, setBestsellers] = useState<Product[]>([]);
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                setBestsellers(data.filter(p => p.isBestseller).slice(0, 4));
            })
            .catch(console.error);
    }, []);

    // Simple auto-rotating slider
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveReviewIndex(prev => (prev + 1) % REAL_REVIEWS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    if (bestsellers.length === 0) return null;

    return (
        <section className="bg-background pt-[60px] md:pt-[100px] pb-[48px] md:pb-[80px] px-4 md:px-8">
            <div className="max-w-[1320px] mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[3px] flex items-center justify-center gap-2 mb-2">
                        <span className="text-[14px]">★</span> CUSTOMER FAVORITES
                    </span>
                    <h2 className="font-playfair text-[28px] md:text-[42px] text-text mb-3 leading-tight">
                        Most Wanted
                    </h2>
                    <p className="font-inter text-[16px] text-text-secondary">
                        Worn daily. Chosen repeatedly.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-12 mb-12">
                    {bestsellers.map(product => (
                        <ProductCard key={product.id} product={product} variant="bestseller" />
                    ))}
                </div>

                {/* Testimonial Slider */}
                <div className="mt-12 bg-background-secondary border border-border rounded-xl p-6 md:p-8 max-w-[600px] mx-auto relative group flex flex-col items-center justify-center min-h-[220px]">
                    <span className="absolute top-4 left-6 font-playfair text-[64px] text-accent-gold opacity-10 leading-none select-none">
                        "
                    </span>

                    <div className="relative w-full text-center px-4 overflow-hidden h-[120px] flex items-center justify-center">
                        {REAL_REVIEWS.map((review, idx) => (
                            <div
                                key={idx}
                                className={`absolute w-full px-2 transition-all duration-700 ease-in-out ${idx === activeReviewIndex
                                        ? 'opacity-100 translate-x-0 !visible'
                                        : 'opacity-0 translate-x-8 invisible'
                                    }`}
                                style={{ visibility: idx === activeReviewIndex ? 'visible' : 'hidden' }}
                            >
                                <p className="font-inter text-[16px] italic text-text leading-[1.7] mb-4">
                                    "{review.quote}"
                                </p>
                                <p className="font-inter text-[14px] text-text-secondary font-bold flex items-center justify-center gap-2">
                                    — {review.name} · {review.date}
                                    <span className="text-accent-gold text-[12px] ring-1 ring-accent-gold/40 rounded-full px-1.5 py-0.5 ml-1">✓ Verified</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-4 z-10 w-full justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        {REAL_REVIEWS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveReviewIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeReviewIndex ? 'w-5 bg-accent-gold' : 'w-1.5 bg-[#2A2A2F]'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                    <Link
                        href="/collections/bestsellers"
                        className="inline-block bg-transparent border border-[#2A2A2F] text-text-secondary font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[40px] py-[14px] rounded hover:border-accent-gold hover:text-accent-gold transition-colors"
                    >
                        VIEW ALL BESTSELLERS
                    </Link>
                </div>

            </div>
        </section>
    );
}
