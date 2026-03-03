"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

const TABS = ['ALL', 'CHAINS', 'RINGS', 'BRACELETS', 'LOCKETS'];

export function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState('ALL');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data.filter(p => p.isNew));
            })
            .catch(console.error);
    }, []);

    const filteredProducts = products.filter(product => {
        if (activeTab === 'ALL') return true;
        if (activeTab === 'CHAINS' && product.category === 'CHAIN') return true;
        if (activeTab === 'RINGS' && product.category === 'RING') return true;
        if (activeTab === 'BRACELETS' && product.category === 'BRACELET') return true;
        if (activeTab === 'LOCKETS' && product.category === 'LOCKET') return true;
        return false;
    });

    if (products.length === 0) return null;

    return (
        <section className="bg-background pt-[100px] pb-[80px] px-4 md:px-8">
            <div className="max-w-[1320px] mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[4px] flex items-center justify-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-system-success animate-pulse" /> ✦ JUST DROPPED
                    </span>
                    <h2 className="font-playfair text-[28px] md:text-[42px] text-text mb-3 leading-tight">
                        Just Dropped
                    </h2>
                    <p className="font-inter text-[16px] text-text-secondary">
                        Fresh arrivals. Limited availability.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 mb-10 pb-2">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap font-montserrat text-[14px] uppercase tracking-[0.08em] px-[24px] py-[10px] rounded-[4px] border transition-all duration-300 relative ${activeTab === tab
                                    ? 'bg-accent-gold border-accent-gold text-background font-bold'
                                    : 'bg-transparent border-[#2A2A2F] text-[#6B6B73] hover:border-accent-gold hover:text-text-secondary'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute -bottom-[6px] left-[10%] w-[80%] h-[2px] bg-accent-gold rounded" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 mb-12">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="animate-in fade-in zoom-in-95 duration-300">
                            <ProductCard product={product} variant="newArrival" />
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-20 font-inter text-text-muted">
                            No products available in this category.
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center flex flex-col items-center gap-3">
                    <Link
                        href="/collections/new-arrivals"
                        className="inline-block bg-transparent border border-[#2A2A2F] text-text-secondary font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[40px] py-[14px] rounded hover:border-accent-gold hover:text-accent-gold transition-colors"
                    >
                        SEE ALL NEW ARRIVALS
                    </Link>
                    <span className="font-inter text-[13px] text-[#6B6B73]">
                        Updated every week with fresh drops
                    </span>
                </div>

            </div>
        </section>
    );
}
