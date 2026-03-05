"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/useCartStore';
import productsDataRaw from '../../../../data/products.json';
import { type Product } from '@/components/ui/ProductCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CompleteTheLookProps {
    currentProductId: string;
    currentCategory: string;
}

export function CompleteTheLook({ currentProductId, currentCategory }: CompleteTheLookProps) {
    const [bundleProducts, setBundleProducts] = useState<Product[]>([]);
    const [isBundleAdded, setIsBundleAdded] = useState(false);
    const { addItem } = useCartStore();

    useEffect(() => {
        // Find 3 products from DIFFERENT categories
        const allProducts = productsDataRaw as Product[];
        const otherCategories = Array.from(new Set(allProducts.map(p => p.category))).filter(c => c.toUpperCase() !== currentCategory.toUpperCase());

        const selectedBundle: Product[] = [];
        const usedCategories = new Set<string>();

        // Try to pick one from each other category until we have 3
        const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random());

        for (const product of shuffledProducts) {
            if (product.id === currentProductId) continue;
            if (product.stock === 0) continue; // ensure in stock

            const prodCat = product.category.toUpperCase();
            if (prodCat !== currentCategory.toUpperCase() && !usedCategories.has(prodCat)) {
                selectedBundle.push(product);
                usedCategories.add(prodCat);
                if (selectedBundle.length === 3) break;
            }
        }

        // Fallback: If we couldn't find 3 unique category items, just fill up to 3 with other items
        if (selectedBundle.length < 3) {
            for (const product of shuffledProducts) {
                if (product.id === currentProductId) continue;
                if (product.stock === 0) continue;
                if (!selectedBundle.find(b => b.id === product.id)) {
                    selectedBundle.push(product);
                    if (selectedBundle.length === 3) break;
                }
            }
        }

        setBundleProducts(selectedBundle);
    }, [currentProductId, currentCategory]);

    const handleAddAll = (e: React.MouseEvent) => {
        e.preventDefault();
        bundleProducts.forEach(product => {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        });
        setIsBundleAdded(true);
        setTimeout(() => setIsBundleAdded(false), 2000);
    };

    const handleAddSingle = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        // Create a local mini toast effect visually later if needed, but adding to cart drawer usually handles feedback
    };

    const headerAnim = useScrollAnimation({ type: 'fade-up' });
    const bundleAnim = useScrollAnimation({ type: 'scale', delay: 200 });

    if (bundleProducts.length < 3) return null;

    const bundleTotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
    // Fake discount applied to bundle for UI
    const bundleOriginal = bundleProducts.reduce((sum, p) => sum + (p.originalPrice || p.price), 0);
    const bundleDiscount = 297; // Arbitrary simulated discount as requested in spec

    return (
        <section
            ref={headerAnim.ref}
            style={headerAnim.styles}
            className="my-8 md:my-12 px-4 sm:px-8 max-w-[1400px] mx-auto"
        >
            <div className="bg-[#121216] border border-[#1F1F25] rounded-[12px] p-6 md:p-8">

                {/* Header */}
                <div className="mb-6 md:mb-8 text-center md:text-left">
                    <h2 className="font-playfair text-[24px] text-[#F5F5F7] mb-1">
                        Complete The Look
                    </h2>
                    <p className="font-inter text-[14px] text-[#A1A1AA]">
                        Pieces that pair perfectly
                    </p>
                </div>

                {/* Bundle Grid */}
                <div
                    ref={bundleAnim.ref}
                    style={bundleAnim.styles}
                    className="flex md:grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0"
                >
                    {bundleProducts.map((product) => (
                        <div
                            key={product.id}
                            className="snap-start shrink-0 w-[240px] md:w-auto bg-[#16161B] border border-[#1F1F25] rounded-[8px] overflow-hidden group"
                        >
                            <Link href={`/products/${product.id}`} className="block">
                                <div className="aspect-square bg-[#0F0F12] overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            <div className="p-3">
                                <span className="block font-montserrat text-[10px] text-[#C6A75E] uppercase mb-1">{product.category}</span>
                                <Link href={`/products/${product.id}`} className="block">
                                    <h3 className="font-inter text-[14px] text-[#F5F5F7] truncate mb-2" title={product.name}>{product.name}</h3>
                                </Link>

                                <div className="flex justify-between items-center">
                                    <span className="font-inter text-[14px] font-bold text-[#F5F5F7]">₹{product.price.toLocaleString('en-IN')}</span>

                                    <button
                                        onClick={(e) => handleAddSingle(e, product)}
                                        className="h-[32px] px-3 border border-[#C6A75E] bg-transparent text-[#C6A75E] font-montserrat text-[11px] uppercase font-bold rounded hover:bg-[#C6A75E] hover:text-[#0B0B0D] transition-colors"
                                    >
                                        ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bundle CTA */}
                <div className="bg-[rgba(198,167,94,0.08)] border border-[rgba(198,167,94,0.2)] rounded-[8px] p-4 mt-6 md:mt-8 text-center flex flex-col items-center">
                    <p className="font-inter text-[14px] text-[#F5F5F7] mb-2">
                        Add all 3 items to bag
                    </p>
                    <div className="flex items-center gap-2 mb-4 justify-center">
                        <span className="font-inter text-[20px] font-bold text-[#C6A75E]">₹{(bundleTotal - bundleDiscount).toLocaleString('en-IN')}</span>
                        <span className="font-inter text-[13px] text-[#4A7C59]">Save ₹{bundleDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                        onClick={handleAddAll}
                        className={`w-full max-w-sm h-[44px] font-montserrat text-[13px] uppercase font-bold rounded-[4px] transition-colors ${isBundleAdded ? 'bg-[#4A7C59] text-white' : 'bg-[#C6A75E] text-[#0B0B0D] hover:bg-[#D8B76A]'}`}
                    >
                        {isBundleAdded ? '✓ BUNDLE ADDED!' : 'ADD BUNDLE TO BAG'}
                    </button>
                </div>

            </div>
        </section>
    );
}
