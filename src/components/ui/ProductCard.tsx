"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    rating?: number;
    reviews?: number;
    isBestseller?: boolean;
    isNew?: boolean;
    badge?: string;
    socialProof?: string;
    stockText?: string;
    description?: string;
    status?: string;
}

interface ProductCardProps {
    product: Product;
    variant?: 'bestseller' | 'newArrival';
}

export function ProductCard({ product, variant = 'bestseller' }: ProductCardProps) {
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
    const { addItem: addToCart } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const isLiked = wishlistItems.some(i => i.id === product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLiked) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (variant === 'newArrival') {
        return (
            <Link href={`/products/${product.id}`} className="block group relative w-full aspect-[3/4] bg-background-card rounded-lg overflow-hidden border border-border">
                {/* Full Bleed Image for New Arrivals */}
                <div className="absolute inset-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover saturate-[0.85] brightness-90 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                    />
                </div>

                {/* Badges */}
                {product.stockText && (
                    <div className="absolute top-4 left-4 bg-urgency-amber/90 text-background px-2.5 py-1 z-10 font-montserrat text-[10px] uppercase font-bold">
                        {product.stockText}
                    </div>
                )}
                {(product.isNew || product.badge) && (
                    <div className="absolute top-4 right-4 bg-text text-background px-2.5 py-1 z-10 font-montserrat text-[10px] uppercase font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-pulse">
                        {product.badge || 'NEW'}
                    </div>
                )}

                {/* Bottom Overlay Gradient & Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/95 via-background/50 to-transparent flex flex-col z-10">
                    <span className="font-montserrat text-[10px] uppercase text-accent-gold tracking-[1px] mb-1">{product.category}</span>
                    <h3 className="font-inter text-lg font-bold text-text line-clamp-2 leading-tight mb-2">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-0">
                        <span className="font-montserrat text-lg font-bold text-accent-gold">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="font-inter text-[12px] text-text-muted line-through mt-0.5">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                        )}          </div>

                    {/* Hover Reveal Button */}
                    <div className="overflow-hidden h-0 group-hover:h-11 transition-all duration-400 ease-in-out mt-0 group-hover:mt-4">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full h-full text-background font-montserrat text-[12px] uppercase font-bold transition-colors ${isAdded ? 'bg-system-success text-white' : 'bg-accent-gold hover:bg-accent-gold-light'
                                }`}
                        >
                            {isAdded ? '✓ ADDED' : 'ADD TO BAG'}
                        </button>
                    </div>
                </div>
            </Link>
        );
    }

    // Bestseller Variant
    return (
        <Link href={`/products/${product.id}`} className="block group w-full bg-background-card p-4 rounded-lg border border-border hover:-translate-y-1.5 hover:border-accent-gold/40 hover:shadow-gold-glow transition-all duration-300 relative cursor-pointer">
            {/* Target Image Box */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0F0F12] mb-3">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges Area */}
                {(product.isBestseller || product.badge) && (
                    <div className="absolute top-3 left-3 bg-accent-gold text-background px-2.5 py-1 z-10 font-montserrat text-[12px] uppercase font-bold rounded flex items-center shadow-sm">
                        {product.badge || 'BESTSELLER'}
                    </div>
                )}

                <button
                    onClick={handleWishlistToggle}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 flex items-center justify-center z-20 group/heart transition-all border border-transparent hover:border-accent-gold ${isLiked ? 'animate-bounce' : ''}`}
                    aria-label="Add to Wishlist"
                >
                    <Heart
                        size={16}
                        className={`transition-colors ${isLiked ? 'fill-accent-gold text-accent-gold' : 'text-text group-hover/heart:text-accent-gold'}`}
                    />
                </button>
            </div>

            {/* Info Area */}
            <div className="flex flex-col">
                <h3 className="font-inter text-[18px] font-bold text-text line-clamp-2 leading-tight mb-2 h-[44px]">
                    {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-2.5">
                    <div className="flex text-accent-gold text-[14px]">
                        {"★".repeat(Math.floor(product.rating || 5))}
                        {"☆".repeat(5 - Math.floor(product.rating || 5))}
                    </div>
                    <span className="font-inter text-[13px] text-text-secondary ml-1">({product.rating || 5})</span>
                    <span className="text-text-muted mx-1">·</span>
                    <span className="font-inter text-[13px] text-text-muted">{product.reviews || 0} reviews</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-inter text-[18px] font-bold text-text">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="font-inter text-[14px] text-text-secondary line-through">₹{(product.originalPrice || product.price).toLocaleString('en-IN')}</span>
                    <span className="font-montserrat text-[12px] bg-system-success/20 text-[#6AAF7B] px-1.5 py-0.5 rounded uppercase font-bold tracking-[1px]">
                        {product.discount || Math.round(((product.originalPrice || product.price) - product.price) / (product.originalPrice || product.price) * 100)}% OFF
                    </span>
                </div>

                <button
                    onClick={handleAddToCart}
                    className={`w-full h-[44px] uppercase font-montserrat text-[14px] font-bold border transition-all duration-300 ${isAdded ? 'bg-system-success border-system-success text-white' : 'bg-background border-accent-gold text-text hover:bg-accent-gold hover:text-background rounded'
                        }`}
                >
                    {isAdded ? '✓ ADDED' : 'ADD TO BAG'}
                </button>

                {product.socialProof && (
                    <p className="font-inter text-[12px] text-urgency-amber mt-2 text-center">
                        {product.socialProof}
                    </p>
                )}
            </div>
        </Link>
    );
}
