"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Search as SearchIcon, Clock } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';

// We fetch products dynamically on first open
interface MiniProduct {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
}

export function OverlaySearch() {
    const { isSearchOpen, closeSearch } = useUIStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<MiniProduct[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
            // Load recent searches
            const saved = localStorage.getItem('tanishtra-recent-searches');
            if (saved) setRecentSearches(JSON.parse(saved));

            // Fetch catalog
            if (products.length === 0) {
                setIsLoading(true);
                fetch('/api/products')
                    .then(res => res.json())
                    .then(data => {
                        setProducts(data);
                        setIsLoading(false);
                    })
                    .catch(() => setIsLoading(false));
            }

            // Auto focus
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => { document.body.style.overflow = 'unset'; };
    }, [isSearchOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isSearchOpen) {
                closeSearch();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, closeSearch]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const newRecent = [searchQuery.trim(), ...recentSearches.filter(q => q !== searchQuery.trim())].slice(0, 5);
            setRecentSearches(newRecent);
            localStorage.setItem('tanishtra-recent-searches', JSON.stringify(newRecent));
        }
    };

    const handleRecentClick = (query: string) => {
        setSearchQuery(query);
        inputRef.current?.focus();
    };

    const filteredProducts = searchQuery.trim() === ''
        ? []
        : products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (!isSearchOpen) return null;

    return (
        <div className="fixed inset-0 z-[1200] bg-background/95 backdrop-blur-md flex flex-col pt-12 md:pt-24 px-4 md:px-8">
            <button
                onClick={closeSearch}
                className="absolute top-6 right-6 md:top-12 md:right-12 text-text-muted hover:text-accent-gold transition-colors"
                aria-label="Close search"
            >
                <X size={32} />
            </button>

            <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
                {/* Search Input Box */}
                <form onSubmit={handleSearchSubmit} className="relative w-full border-b-2 border-border focus-within:border-accent-gold transition-colors pb-4">
                    <SearchIcon size={28} className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for chains, rings, bracelets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none outline-none font-bebas text-3xl md:text-5xl text-text placeholder-text-muted/50 pl-12 tracking-widest"
                    />
                </form>

                {/* Search Results Area */}
                <div className="flex-1 overflow-y-auto pt-10 pb-20">

                    {searchQuery.trim() === '' ? (
                        <div className="flex flex-col md:flex-row gap-12">
                            {recentSearches.length > 0 && (
                                <div className="flex-1">
                                    <h3 className="font-montserrat text-[11px] uppercase tracking-[2px] text-text-secondary mb-6">Recent Searches</h3>
                                    <ul className="flex flex-col gap-4">
                                        {recentSearches.map((query, idx) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleRecentClick(query)}
                                                    className="flex items-center gap-3 text-text hover:text-accent-gold transition-colors font-inter text-lg"
                                                >
                                                    <Clock size={16} className="text-text-muted" />
                                                    {query}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className="font-montserrat text-[11px] uppercase tracking-[2px] text-text-secondary mb-6">Popular Categories</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['Chain', 'Titan Series', 'Minimal Rings', 'Bracelets'].map((cat, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleRecentClick(cat)}
                                            className="px-4 py-2 border border-border rounded-full font-inter text-sm text-text-secondary hover:border-accent-gold hover:text-accent-gold transition-all"
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="font-montserrat text-[11px] uppercase tracking-[2px] text-text-secondary mb-8">
                                {filteredProducts.length} Results for "{searchQuery}"
                            </h3>

                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="font-playfair text-2xl text-text mb-4">No products found</p>
                                    <p className="font-inter text-text-muted">Try checking your spelling or using more general terms.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                    {filteredProducts.map((product) => (
                                        <Link
                                            href={`/products/${product.id}`}
                                            key={product.id}
                                            onClick={closeSearch}
                                            className="group flex flex-col"
                                        >
                                            <div className="aspect-square bg-background-secondary rounded-lg overflow-hidden mb-4 border border-border group-hover:border-accent-gold/50 transition-colors">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <span className="font-montserrat text-[10px] text-accent-gold uppercase tracking-[1px] mb-1">{product.category}</span>
                                            <h4 className="font-inter text-sm text-text font-bold mb-2 line-clamp-2 group-hover:text-accent-gold transition-colors">{product.name}</h4>
                                            <p className="font-montserrat text-sm font-bold text-text-secondary mt-auto">₹{product.price.toLocaleString('en-IN')}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
