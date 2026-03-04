"use client";
import React, { useEffect, useState } from 'react';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

export function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Read from local storage
        const savedIds = JSON.parse(localStorage.getItem('tanishtra-recently-viewed') || '[]');

        if (savedIds.length > 0) {
            fetch('/api/products')
                .then(res => res.json())
                .then((data: Product[]) => {
                    // Filter matching IDs, keeping order, excluding current
                    const matched = savedIds
                        .filter((id: string) => id !== currentProductId)
                        .map((id: string) => data.find(p => p.id === id))
                        .filter(Boolean)
                        .slice(0, 4); // Max 4

                    setRecentProducts(matched);
                })
                .catch(console.error);
        }
    }, [currentProductId]);

    if (recentProducts.length === 0) return null;

    return (
        <section className="py-24 bg-[#0B0B0D] border-t border-[#1F1F25]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
                <div className="text-center mb-16">
                    <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] block mb-3 font-bold">
                        YOUR HISTORY
                    </span>
                    <h2 className="font-playfair text-[36px] md:text-[42px] text-[#F5F5F7]">Recently Viewed</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {recentProducts.map(product => (
                        <ProductCard key={product.id} product={product} variant="bestseller" />
                    ))}
                </div>
            </div>
        </section>
    );
}
