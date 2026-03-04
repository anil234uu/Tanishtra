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
    hoverImage?: string; // 3A
    rating?: number;
    reviews?: number;
    isBestseller?: boolean;
    isNew?: boolean;
    badges?: string[]; // Arrays of strings or specific status tags
    badge?: string;
    status?: string; // For HOT, SELLING FAST, LIMITED EDITION, BACK IN STOCK
    stock?: number; // 3C
    stockText?: string;
    socialProof?: string;
    description?: string;
    sizes?: string[]; // 3E
}

interface ProductCardProps {
    product: Product;
    variant?: 'bestseller' | 'newArrival';
}

export function ProductCard({ product, variant = 'bestseller' }: ProductCardProps) {
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
    const { addItem: addToCart } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const isLiked = wishlistItems.some(i => i.id === product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLiked) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock === 0) return; // Prevent adding if out of stock
        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, size: selectedSize || undefined });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleSizeSelect = (e: React.MouseEvent, size: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSize(size);
    };

    // 3B: Badges System
    const renderBadges = () => {
        const badgesToRender: { text: string, style: string }[] = [];

        if (product.isBestseller) badgesToRender.push({ text: 'BESTSELLER', style: 'bg-[#C6A75E] text-[#0B0B0D]' });
        if (product.isNew) badgesToRender.push({ text: 'NEW', style: 'bg-[#F5F5F7] text-[#0B0B0D] animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.3)]' });

        if (product.status === 'HOT' || product.badge === 'HOT') badgesToRender.push({ text: 'HOT 🔥', style: 'bg-[#D04242] text-[#F5F5F7]' });
        if (product.status === 'SELLING FAST' || product.badge === 'SELLING FAST') badgesToRender.push({ text: 'SELLING FAST', style: 'bg-[#D4A03C] text-[#0B0B0D]' });
        if (product.status === 'LIMITED EDITION' || product.badge === 'LIMITED EDITION') badgesToRender.push({ text: 'LIMITED EDITION', style: 'bg-transparent border border-[#C6A75E] text-[#C6A75E]' });
        if (product.status === 'BACK IN STOCK' || product.badge === 'BACK IN STOCK') badgesToRender.push({ text: 'BACK IN STOCK', style: 'bg-[#4A7C59] text-[#F5F5F7]' });

        if (product.badge && !badgesToRender.some(b => b.text.includes(product.badge!))) {
            badgesToRender.push({ text: product.badge, style: 'bg-[#C6A75E] text-[#0B0B0D]' });
        }

        if (badgesToRender.length === 0) return null;

        return (
            <div className="absolute top-2.5 left-2.5 z-[15] flex flex-col gap-1 items-start">
                {badgesToRender.map((badge, idx) => (
                    <div key={idx} className={`font-montserrat text-[10px] uppercase font-bold px-[10px] py-[4px] rounded-[4px] ${badge.style}`}>
                        {badge.text}
                    </div>
                ))}
            </div>
        );
    };

    // 3C: Scarcity Indicators
    const renderScarcity = () => {
        if (product.stock === undefined && !product.stockText) return null;

        if (product.stock === 0) {
            return (
                <div className="font-inter text-[12px] flex flex-row items-center gap-1 mt-2 text-[#6B6B73]">
                    SOLD OUT
                </div>
            );
        } else if (product.stock! > 0 && product.stock! <= 5) {
            return (
                <div className="font-inter text-[12px] flex flex-row items-center gap-1 mt-2 text-[#D04242]">
                    <span className="animate-pulse">🔥 Only {product.stock} left — selling fast!</span>
                </div>
            );
        } else if (product.stock! > 5 && product.stock! <= 15) {
            return (
                <div className="font-inter text-[12px] flex flex-row items-center gap-1 mt-2 text-[#D4A03C]">
                    <span>⚡ Only {product.stock} left in stock</span>
                </div>
            );
        }

        if (product.stockText) {
            return (
                <div className="font-inter text-[12px] flex flex-row items-center gap-1 mt-2 text-[#D4A03C]">
                    <span>⚡ {product.stockText}</span>
                </div>
            );
        }

        return null;
    };

    const isSoldOut = product.stock === 0;

    if (variant === 'newArrival') {
        return (
            <Link href={`/products/${product.id}`} className={`block group relative w-full aspect-[3/4] bg-[#16161B] rounded-lg border border-[#1F1F25] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),_0_0_0_1px_rgba(198,167,94,0.3),_0_0_40px_rgba(198,167,94,0.08)] ${isSoldOut ? 'opacity-60 grayscale-[50%]' : ''}`}>
                {/* Image Swap System */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover saturate-[0.85] brightness-90 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500 absolute inset-0 ${product.hoverImage ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'}`}
                    />
                    {product.hoverImage && (
                        <img
                            src={product.hoverImage}
                            alt={`${product.name} alternate view`}
                            className="w-full h-full object-cover saturate-[100] brightness-100 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                    )}
                </div>

                {renderBadges()}

                {/* Bottom Overlay Gradient & Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[rgba(11,11,13,0.95)] via-[rgba(11,11,13,0.5)] to-transparent flex flex-col z-10">
                    <span className="font-montserrat text-[10px] uppercase text-[#C6A75E] tracking-[1px] mb-1">{product.category}</span>
                    <h3 className="font-inter text-[18px] font-bold text-[#F5F5F7] line-clamp-2 leading-tight mb-2">{product.name}</h3>

                    <div className="flex flex-wrap items-center gap-2 mb-0">
                        <span className="font-montserrat text-[18px] font-bold text-[#C6A75E]">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="font-inter text-[12px] text-[#A1A1AA] line-through mt-0.5">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                    {renderScarcity()}

                    {/* Quick Size Selector */}
                    {product.sizes && product.sizes.length > 0 && !isSoldOut && (
                        <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 mt-0 group-hover:mt-3 mb-0 flex row gap-1.5 z-20">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={(e) => handleSizeSelect(e, size)}
                                    className={`font-montserrat text-[11px] px-[12px] py-[4px] rounded-full border transition-colors ${selectedSize === size ? 'bg-[#C6A75E] text-[#0B0B0D] border-[#C6A75E]' : 'bg-transparent text-[#6B6B73] border-[#2A2A2F] hover:border-[#C6A75E] hover:text-[#C6A75E]'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Hover Reveal Button */}
                    <div className="overflow-hidden h-0 group-hover:h-[44px] transition-all duration-400 ease-in-out mt-0 group-hover:mt-3">
                        <button
                            onClick={handleAddToCart}
                            disabled={isSoldOut}
                            className={`w-full h-[44px] text-[#0B0B0D] font-montserrat text-[12px] uppercase font-bold transition-colors rounded-[4px] ${isSoldOut ? 'bg-[#2A2A2F] text-[#6B6B73] cursor-not-allowed' : isAdded ? 'bg-[#4A7C59] text-white' : 'bg-[#C6A75E] hover:bg-[#D8B76A]'}`}
                        >
                            {isSoldOut ? 'NOTIFY ME' : isAdded ? '✓ ADDED' : 'ADD TO BAG'}
                        </button>
                    </div>
                </div>
            </Link>
        );
    }

    // Default Variant
    return (
        <Link href={`/products/${product.id}`} className={`block group w-full bg-[#16161B] p-4 rounded-lg border border-[#1F1F25] transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),_0_0_0_1px_rgba(198,167,94,0.3),_0_0_40px_rgba(198,167,94,0.08)] relative cursor-pointer flex flex-col h-full ${isSoldOut ? 'opacity-70 grayscale-[30%]' : ''}`}>

            {/* Target Image Box */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0F0F12] mb-3">
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-400 absolute inset-0 z-[1] ${product.hoverImage ? 'opacity-100 group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'}`}
                />
                {product.hoverImage && (
                    <img
                        src={product.hoverImage}
                        alt={`${product.name} alternate view`}
                        className="w-full h-full object-cover transition-all duration-400 absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                )}

                {isSoldOut && (
                    <div className="absolute inset-0 bg-[#0B0B0D]/50 z-[12] flex items-center justify-center backdrop-blur-[1px]">
                        <span className="font-montserrat text-[14px] uppercase tracking-[2px] text-[#F5F5F7] font-bold">SOLD OUT</span>
                    </div>
                )}

                {renderBadges()}

                <button
                    onClick={handleWishlistToggle}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-[rgba(11,11,13,0.6)] flex items-center justify-center z-[20] group/heart transition-all border border-transparent hover:border-[#C6A75E] ${isLiked ? 'animate-bounce' : ''}`}
                    aria-label="Add to Wishlist"
                >
                    <Heart
                        size={16}
                        className={`transition-colors ${isLiked ? 'fill-[#C6A75E] text-[#C6A75E]' : 'text-[#F5F5F7] group-hover/heart:text-[#C6A75E]'}`}
                    />
                </button>
            </div>

            {/* Info Area */}
            <div className="flex flex-col flex-1">
                <h3 className="font-inter text-[16px] md:text-[18px] font-bold text-[#F5F5F7] line-clamp-2 leading-tight mb-2 min-h-[44px]">
                    {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-2.5">
                    <div className="flex text-[#C6A75E] text-[14px]">
                        {"★".repeat(Math.floor(product.rating || 5))}
                        {"☆".repeat(5 - Math.floor(product.rating || 5))}
                    </div>
                    <span className="font-inter text-[13px] text-[#A1A1AA] ml-1">({product.rating || 5})</span>
                    <span className="text-[#6B6B73] mx-1">·</span>
                    <span className="font-inter text-[13px] text-[#6B6B73]">{product.reviews || 0} reviews</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-inter text-[18px] font-bold text-[#F5F5F7]">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="font-inter text-[14px] text-[#A1A1AA] line-through">₹{(product.originalPrice || product.price).toLocaleString('en-IN')}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="font-montserrat text-[12px] bg-[rgba(74,124,89,0.2)] text-[#6AAF7B] px-1.5 py-0.5 rounded uppercase font-bold tracking-[1px]">
                            {product.discount || Math.round(((product.originalPrice || product.price) - product.price) / (product.originalPrice || product.price) * 100)}% OFF
                        </span>
                    )}
                </div>

                <div className="mt-auto flex flex-col">
                    {/* Quick Size Selector */}
                    {product.sizes && product.sizes.length > 0 && !isSoldOut && (
                        <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 mb-3 flex flex-row flex-wrap gap-1.5 z-20">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={(e) => handleSizeSelect(e, size)}
                                    className={`font-montserrat text-[11px] px-[12px] py-[4px] rounded-full border transition-colors ${selectedSize === size ? 'bg-[#C6A75E] text-[#0B0B0D] border-[#C6A75E]' : 'bg-transparent text-[#6B6B73] border-[#2A2A2F] hover:border-[#C6A75E] hover:text-[#C6A75E]'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        disabled={isSoldOut}
                        className={`w-full h-[44px] uppercase font-montserrat text-[14px] font-bold border transition-all duration-300 rounded-[4px] relative z-20 ${isSoldOut ? 'bg-transparent border-[#2A2A2F] text-[#6B6B73] cursor-not-allowed hover:bg-[#1F1F25] hover:text-[#A1A1AA]' : isAdded ? 'bg-[#4A7C59] border-[#4A7C59] text-white' : 'bg-transparent border-[#C6A75E] text-[#F5F5F7] hover:bg-[#C6A75E] hover:text-[#0B0B0D]'}`}
                    >
                        {isSoldOut ? 'NOTIFY ME' : isAdded ? '✓ ADDED' : 'ADD TO BAG'}
                    </button>

                    {renderScarcity()}
                </div>
            </div>
        </Link>
    );
}
