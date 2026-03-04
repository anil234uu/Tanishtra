"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

interface SectionProps {
    id: string;
    settings: {
        eyebrow?: string;
        title?: string;
        subtitle?: string;
        displayType?: string;
        columns?: number;
        maxProducts?: number;
        filter?: string;
        showFilters?: boolean;
        filterTabs?: string[];
        showRatings?: boolean;
        showSocialProof?: boolean;
        showStockIndicator?: boolean;
        cardStyle?: string;
        ctaText?: string;
        ctaLink?: string;
    };
}

export default function ProductShowcaseSection({ id, settings }: SectionProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState(settings.filterTabs?.[0] || 'ALL');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                let filtered = data;
                if (settings.filter === 'bestseller') {
                    filtered = data.filter(p => p.isBestseller);
                } else if (settings.filter === 'new-arrival') {
                    filtered = data.filter(p => p.isNew);
                }
                setProducts(filtered.slice(0, settings.maxProducts || 4));
            })
            .catch(console.error);
    }, [settings.filter, settings.maxProducts]);

    const displayProducts = products.filter(product => {
        if (!settings.showFilters) return true;
        if (activeTab === 'ALL') return true;
        if (activeTab === 'CHAINS' && product.category === 'CHAIN') return true;
        if (activeTab === 'RINGS' && product.category === 'RING') return true;
        if (activeTab === 'BRACELETS' && product.category === 'BRACELET') return true;
        if (activeTab === 'LOCKETS' && product.category === 'LOCKET') return true;
        // generic fallback
        if (activeTab.slice(0, -1) === product.category) return true;
        return false;
    });

    if (products.length === 0) return null;

    // Grid classes based on columns setting
    const gridColsOptions: Record<number, string> = {
        2: 'grid-cols-2 lg:grid-cols-2',
        3: 'grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
    };
    const colClass = gridColsOptions[settings.columns || 4] || gridColsOptions[4];

    return (
        <section id={id} className={`bg-background px-4 md:px-8 ${settings.filter === 'new-arrival' ? 'pt-[100px] pb-[80px]' : 'pt-[60px] md:pt-[100px] pb-[48px] md:pb-[80px]'}`}>
            <div className="max-w-[1320px] mx-auto">
                <div className="text-center mb-10">
                    {settings.eyebrow && (
                        <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[3px] flex items-center justify-center gap-2 mb-2">
                            {settings.filter === 'new-arrival' ? <span className="w-1.5 h-1.5 rounded-full bg-system-success animate-pulse" /> : <span className="text-[14px]">★</span>}
                            {settings.eyebrow}
                        </span>
                    )}
                    {settings.title && (
                        <h2 className="font-playfair text-[28px] md:text-[42px] text-text mb-3 leading-tight">
                            {settings.title}
                        </h2>
                    )}
                    {settings.subtitle && (
                        <p className="font-inter text-[16px] text-text-secondary">
                            {settings.subtitle}
                        </p>
                    )}
                </div>

                {settings.showFilters && settings.filterTabs && settings.filterTabs.length > 0 && (
                    <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 mb-10 pb-2">
                        {settings.filterTabs.map(tab => (
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
                )}

                <div className={`grid ${colClass} gap-4 md:gap-6 mt-8 mb-12`}>
                    {displayProducts.map(product => (
                        <div key={product.id} className={settings.filter === 'new-arrival' ? "animate-in fade-in zoom-in-95 duration-300" : ""}>
                            <ProductCard
                                product={product}
                                variant={settings.filter === 'new-arrival' ? 'newArrival' : 'bestseller'}
                            />
                        </div>
                    ))}
                    {displayProducts.length === 0 && (
                        <div className="col-span-full text-center py-20 font-inter text-text-muted">
                            No products available in this category.
                        </div>
                    )}
                </div>

                {settings.ctaText && settings.ctaLink && (
                    <div className="mt-12 text-center flex flex-col items-center gap-3">
                        <Link
                            href={settings.ctaLink}
                            className="inline-block bg-transparent border border-[#2A2A2F] text-text-secondary font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[40px] py-[14px] rounded hover:border-accent-gold hover:text-accent-gold transition-colors"
                        >
                            {settings.ctaText}
                        </Link>
                        {settings.filter === 'new-arrival' && (
                            <span className="font-inter text-[13px] text-[#6B6B73]">
                                Updated every week with fresh drops
                            </span>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
