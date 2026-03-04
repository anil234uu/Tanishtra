"use client";
import React, { useEffect, useState } from 'react';

interface Review {
    quote: string;
    author: string;
    date: string;
    verified: boolean;
    product: string;
}

interface SectionProps {
    id: string;
    settings: {
        reviews: Review[];
        autoRotate?: boolean;
        interval?: number;
    };
}

export default function TestimonialSliderSection({ id, settings }: SectionProps) {
    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const reviews = settings.reviews || [];

    useEffect(() => {
        if (!settings.autoRotate || reviews.length <= 1) return;

        const timer = setInterval(() => {
            setActiveReviewIndex(prev => (prev + 1) % reviews.length);
        }, settings.interval || 5000);

        return () => clearInterval(timer);
    }, [settings.autoRotate, settings.interval, reviews.length]);

    if (reviews.length === 0) return null;

    return (
        <section id={id} className="bg-background pb-[80px] px-4 md:px-8">
            <div className="max-w-[1320px] mx-auto">
                <div className="bg-background-secondary border border-border rounded-xl p-6 md:p-8 max-w-[600px] mx-auto relative group flex flex-col items-center justify-center min-h-[220px]">
                    <span className="absolute top-4 left-6 font-playfair text-[64px] text-accent-gold opacity-10 leading-none select-none">
                        "
                    </span>

                    <div className="relative w-full text-center px-4 overflow-hidden h-[120px] flex items-center justify-center">
                        {reviews.map((review, idx) => (
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
                                <p className="font-inter text-[14px] text-text-secondary font-bold flex flex-wrap items-center justify-center gap-2">
                                    — {review.author} · {review.date}
                                    {review.verified && (
                                        <span className="text-accent-gold text-[12px] ring-1 ring-accent-gold/40 rounded-full px-1.5 py-0.5 ml-1">✓ Verified</span>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>

                    {reviews.length > 1 && (
                        <div className="flex gap-2 mt-4 z-10 w-full justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                            {reviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveReviewIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeReviewIndex ? 'w-5 bg-accent-gold' : 'w-1.5 bg-[#2A2A2F]'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
