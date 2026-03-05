"use client";
import React, { useEffect, useState } from 'react';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import productsDataRaw from '../../../../data/products.json';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CustomersAlsoBoughtProps {
    currentProductId: string;
}

export function CustomersAlsoBought({ currentProductId }: CustomersAlsoBoughtProps) {
    const [socialPicks, setSocialPicks] = useState<Product[]>([]);

    useEffect(() => {
        // Find bestsellers, exclude current
        const productsMatches = (productsDataRaw as Product[])
            .filter(p => p.isBestseller && p.id !== currentProductId);

        // Shuffle and pick 6 to allow scrolling
        const shuffled = [...productsMatches].sort(() => 0.5 - Math.random());
        setSocialPicks(shuffled.slice(0, 6));
    }, [currentProductId]);

    const headerAnim = useScrollAnimation({ type: 'fade-up' });
    const carouselAnim = useScrollAnimation({ type: 'fade-up', delay: 100 });

    if (socialPicks.length === 0) return null;

    return (
        <section className="py-20 md:py-24 bg-[#0B0B0D]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">

                {/* Header */}
                <div
                    ref={headerAnim.ref}
                    style={headerAnim.styles}
                    className="mb-12 text-center"
                >
                    <h2 className="font-playfair text-[28px] text-[#F5F5F7] mb-2 leading-tight">
                        Customers Also Bought
                    </h2>
                    <p className="font-inter text-[14px] text-[#A1A1AA]">
                        Popular picks from verified buyers
                    </p>
                </div>

            </div>

            {/* Horizontal Scroll Strip */}
            <div
                ref={carouselAnim.ref}
                style={carouselAnim.styles}
                className="pl-4 sm:pl-8 max-w-[1400px] mx-auto"
            >
                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pr-4 sm:pr-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                    {socialPicks.map((product) => (
                        <div key={product.id} className="snap-start shrink-0 min-w-[280px] md:min-w-[320px] max-w-[320px]">
                            <ProductCard product={product} />
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
