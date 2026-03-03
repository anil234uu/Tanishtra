"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useQuickViewStore } from '@/lib/store/useQuickViewStore';
import { useCartStore } from '@/lib/store/useCartStore';
import Link from 'next/link';

export function QuickViewModal() {
    const { product, isOpen, closeQuickView } = useQuickViewStore();
    const { addItem } = useCartStore();

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/90 backdrop-blur-md z-[110]"
                        onClick={closeQuickView}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl max-h-[90vh] bg-background border border-border z-[120] flex flex-col md:flex-row overflow-hidden shadow-dark"
                    >
                        <button
                            onClick={closeQuickView}
                            className="absolute top-4 right-4 text-background md:text-text bg-background/50 md:bg-transparent rounded-full p-2 z-10 hover:text-accent-gold hover:bg-background transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="md:w-1/2 h-64 md:h-[600px] relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-center">
                            <span className="font-montserrat text-[11px] text-accent-gold uppercase tracking-[2px] block mb-2">
                                {product.category}
                            </span>
                            <h2 className="font-bebas text-4xl sm:text-5xl text-text mb-4 tracking-widest leading-tight">
                                {product.name}
                            </h2>

                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                                <span className="font-montserrat text-3xl font-bold text-accent-gold">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                {product.originalPrice && (
                                    <span className="font-montserrat text-lg text-text-muted line-through">
                                        ₹{product.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-4 mb-8">
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            quantity: 1
                                        });
                                        closeQuickView();
                                    }}
                                    className="w-full bg-accent-gold text-background hover:bg-accent-gold-light py-4 font-montserrat uppercase tracking-[2px] font-bold transition-colors"
                                >
                                    Add to Bag
                                </button>
                                <Link
                                    href={`/products/${product.id}`}
                                    onClick={closeQuickView}
                                    className="block w-full border border-border text-text hover:border-accent-gold hover:text-accent-gold py-4 font-montserrat uppercase tracking-[2px] font-bold transition-colors text-center"
                                >
                                    View Full Details
                                </Link>
                            </div>

                            <p className="font-inter text-sm text-text-muted leading-relaxed">
                                Experience unparalleled craftsmanship with this statement piece. Designed for the modern Indian man, blending dark luxury with timeless presence.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
