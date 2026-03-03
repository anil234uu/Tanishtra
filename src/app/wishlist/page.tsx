"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { ProductCard } from '@/components/ui/ProductCard';

export default function WishlistPage() {
    const { items } = useWishlistStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-background min-h-screen pt-[140px] flex justify-center">
                <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pt-[120px] md:pt-[160px] pb-24 px-4 md:px-8">

            <div className="max-w-[1320px] mx-auto">
                <div className="mb-12 border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">
                            PRIVATE COLLECTION
                        </span>
                        <h1 className="font-bebas text-5xl md:text-6xl tracking-[2px] text-text mb-2">
                            YOUR WISHLIST
                        </h1>
                        <p className="font-inter text-text-secondary">
                            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later consideration.
                        </p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-24 bg-background-secondary border border-border rounded-lg">
                        <h2 className="font-playfair text-2xl text-text mb-4">Your wishlist is empty</h2>
                        <p className="font-inter text-text-secondary mb-8">Curate your personal collection of armor.</p>
                        <Link
                            href="/collections"
                            className="inline-block bg-accent-gold text-background hover:bg-accent-gold-light transition-colors px-10 py-4 rounded font-montserrat uppercase font-bold text-[13px] tracking-[1px]"
                        >
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {items.map(product => (
                            <div key={product.id} className="animate-in fade-in zoom-in-95 duration-500">
                                <ProductCard product={product as any} variant="bestseller" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
