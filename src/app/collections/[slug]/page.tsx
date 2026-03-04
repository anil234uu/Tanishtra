"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';

export default function CollectionSlugPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('featured');

    // Filters
    const [priceFilter, setPriceFilter] = useState<string>('all');
    const [materialFilter, setMaterialFilter] = useState<string>('all');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                // Filter logic based on slug
                let filtered = data;
                if (slug === 'bestsellers') {
                    filtered = data.filter(p => p.isBestseller);
                } else if (slug === 'new-arrivals') {
                    filtered = data.filter(p => p.isNew);
                } else if (slug === 'titan-series') {
                    filtered = data.filter(p => p.name.includes('Titan') || p.name.includes('Eternum'));
                } else {
                    // Slug format mapping to category names natively in DB
                    // "locket-chain" -> "LOCKET & CHAIN", "chain" -> "CHAIN"
                    const targetCategory = slug.replace('-', ' & ').toUpperCase();
                    // Relaxed matching for LOCKETS vs LOCKET & CHAIN
                    filtered = data.filter(p =>
                        p.category.toUpperCase().includes(targetCategory) ||
                        targetCategory.includes(p.category.toUpperCase())
                    );
                }

                setProducts(filtered);
                setIsLoading(false);
            })
            .catch(console.error);
    }, [slug]);

    // Apply Advanced Filters
    const filteredAndSortedProducts = [...products]
        .filter(p => {
            if (priceFilter === 'under-1000') return p.price < 1000;
            if (priceFilter === '1000-2000') return p.price >= 1000 && p.price <= 2000;
            if (priceFilter === 'above-2000') return p.price > 2000;
            return true;
        })
        .filter(p => {
            if (materialFilter === 'all') return true;
            // Simulated material check using name/description
            const targetMaterial = materialFilter.toLowerCase();
            return p.name.toLowerCase().includes(targetMaterial) || (p.description?.toLowerCase() || '').includes(targetMaterial);
        })
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        });

    const getCollectionTitle = () => {
        if (slug === 'bestsellers') return 'Most Wanted';
        if (slug === 'new-arrivals') return 'Just Dropped';
        if (slug === 'titan-series') return 'The Titan Series';
        return slug.replace('-', ' & ').toUpperCase();
    };

    return (
        <div className="bg-background min-h-screen">

            {/* Header */}
            <section className="bg-background-secondary border-b border-border py-12 md:py-20 px-4 md:px-8">
                <div className="max-w-[1320px] mx-auto text-center">
                    {/* Breadcrumbs */}
                    <div className="font-inter text-[12px] text-text-muted mb-6 flex items-center justify-center gap-2">
                        <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/collections" className="hover:text-accent-gold transition-colors">Collections</Link>
                        <span>/</span>
                        <span className="text-text capitalize">{slug.replace('-', ' ')}</span>
                    </div>

                    <h1 className="font-playfair text-[32px] md:text-[56px] text-text mb-4 capitalize">
                        {getCollectionTitle()}
                    </h1>
                    <p className="font-inter text-[16px] text-text-secondary max-w-xl mx-auto">
                        {slug === 'bestsellers'
                            ? 'The pieces that men rely on daily. Proven styles.'
                            : 'Discover our premium selection crafted for presence and dominance.'}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-8 lg:gap-12">

                {/* Sidebar Filters (Desktop) */}
                <aside className="w-full md:w-[240px] shrink-0 border-b md:border-b-0 border-[#1F1F25] pb-8 md:pb-0">
                    <div className="sticky top-[120px] flex flex-col gap-8">
                        <div>
                            <h3 className="font-bebas text-xl text-[#F5F5F7] tracking-widest mb-4">Price Range</h3>
                            <div className="flex flex-col gap-3 font-inter text-sm text-[#A1A1AA]">
                                {['all', 'under-1000', '1000-2000', 'above-2000'].map(val => (
                                    <label key={val} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="price"
                                            value={val}
                                            checked={priceFilter === val}
                                            onChange={() => setPriceFilter(val)}
                                            className="w-4 h-4 accent-[#C6A75E] bg-transparent cursor-pointer"
                                        />
                                        <span className={`group-hover:text-[#C6A75E] transition-colors ${priceFilter === val ? 'text-[#C6A75E] font-bold' : ''}`}>
                                            {val === 'all' ? 'All Prices'
                                                : val === 'under-1000' ? 'Under ₹1,000'
                                                    : val === '1000-2000' ? '₹1,000 - ₹2,000'
                                                        : 'Above ₹2,000'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bebas text-xl text-[#F5F5F7] tracking-widest mb-4">Material</h3>
                            <div className="flex flex-col gap-3 font-inter text-sm text-[#A1A1AA]">
                                {['all', 'steel', 'silver', 'black', 'gold'].map(val => (
                                    <label key={val} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="material"
                                            value={val}
                                            checked={materialFilter === val}
                                            onChange={() => setMaterialFilter(val)}
                                            className="w-4 h-4 accent-[#C6A75E] bg-transparent cursor-pointer"
                                        />
                                        <span className={`group-hover:text-[#C6A75E] transition-colors capitalize ${materialFilter === val ? 'text-[#C6A75E] font-bold' : ''}`}>
                                            {val}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 w-full flex flex-col">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-[#1F1F25]">
                        <p className="font-inter text-sm text-[#A1A1AA]">
                            Showing <strong className="text-[#F5F5F7]">{filteredAndSortedProducts.length}</strong> products
                        </p>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <label htmlFor="sort" className="font-montserrat text-[11px] uppercase tracking-[1px] text-[#A1A1AA] shrink-0">Sort By</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto bg-[#121216] border border-[#2A2A2F] rounded-md px-4 py-2 text-[#F5F5F7] font-inter text-sm focus:outline-none focus:border-[#C6A75E] transition-colors cursor-pointer appearance-none px-4"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    backgroundSize: '16px',
                                    paddingRight: '40px'
                                }}
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredAndSortedProducts.length === 0 ? (
                        <div className="text-center py-24 bg-[#121216] border border-[#1F1F25] rounded-xl">
                            <h2 className="font-playfair text-2xl text-[#F5F5F7] mb-4">No products found</h2>
                            <p className="font-inter text-[#A1A1AA] mb-8">Try adjusting your active filters.</p>
                            <button
                                onClick={() => { setMaterialFilter('all'); setPriceFilter('all'); setSortBy('featured'); }}
                                className="inline-block bg-[#C6A75E] text-[#0B0B0D] hover:bg-[#D8B76A] transition-colors font-montserrat text-[14px] uppercase font-bold px-8 py-4 rounded"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} variant="bestseller" />
                            ))}
                        </div>
                    )}
                </div>

            </section>

        </div>
    );
}
