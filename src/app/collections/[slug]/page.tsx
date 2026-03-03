"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

export default function CollectionSlugPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                setAllProducts(data);

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

    // Handle sorting
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Featured (default)
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
            <section className="max-w-[1320px] mx-auto px-4 md:px-8 py-12">

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-border">
                    <p className="font-inter text-[14px] text-text-secondary">
                        Showing <strong className="text-text">{products.length}</strong> products
                    </p>

                    <div className="flex items-center gap-3">
                        <label htmlFor="sort" className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-muted">Sort By</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-background-card border border-border rounded px-4 py-2 text-text font-inter text-sm focus:outline-none focus:border-accent-gold transition-colors cursor-pointer"
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
                    <div className="h-[40vh] flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-24">
                        <h2 className="font-playfair text-2xl text-text mb-4">No products found</h2>
                        <p className="font-inter text-text-secondary mb-8">We couldn't find any products in this collection.</p>
                        <Link href="/collections" className="inline-block bg-accent-gold text-background font-montserrat text-[14px] uppercase font-bold px-8 py-4 rounded">
                            Browse All Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {sortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} variant="bestseller" />
                        ))}
                    </div>
                )}

            </section>

        </div>
    );
}
