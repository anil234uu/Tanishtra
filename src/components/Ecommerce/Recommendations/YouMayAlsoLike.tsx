"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import productsDataRaw from '../../../../data/products.json';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface YouMayAlsoLikeProps {
    currentProductId: string;
    currentCategory: string;
}

export function YouMayAlsoLike({ currentProductId, currentCategory }: YouMayAlsoLikeProps) {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Find products in same category, exclude current
        const productsMatches = (productsDataRaw as Product[])
            .filter(p => p.category.toUpperCase() === currentCategory.toUpperCase() && p.id !== currentProductId);

        // Shuffle and pick 4
        const shuffled = [...productsMatches].sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
    }, [currentProductId, currentCategory]);

    const headerAnim = useScrollAnimation({ type: 'fade-up' });
    const gridAnim = useScrollAnimation({ type: 'stagger', delay: 100 });

    if (relatedProducts.length === 0) return null;

    return (
        <section className="py-20 bg-background-secondary border-t border-border mt-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">

                {/* Header */}
                <div
                    ref={headerAnim.ref}
                    style={headerAnim.styles}
                    className="mb-12"
                >
                    <h2 className="font-playfair text-[28px] text-[#F5F5F7] mb-2 leading-tight">
                        You May Also Like
                    </h2>
                    <p className="font-inter text-[14px] text-[#A1A1AA]">
                        More from our {currentCategory.toLowerCase()} collection
                    </p>
                </div>

                {/* Grid */}
                <div
                    ref={gridAnim.ref}
                    style={gridAnim.styles}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {relatedProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            style={{
                                opacity: gridAnim.isVisible ? 1 : 0,
                                transform: gridAnim.isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`
                            }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Link */}
                <div className="mt-12 text-center">
                    <Link
                        href={`/collections/${currentCategory.toLowerCase().replace(' ', '-')}`}
                        className="font-montserrat text-[13px] uppercase text-[#C6A75E] font-bold tracking-[1px] hover:text-[#D8B76A] transition-colors"
                    >
                        VIEW ALL {currentCategory}S &rarr;
                    </Link>
                </div>

            </div>
        </section>
    );
}
