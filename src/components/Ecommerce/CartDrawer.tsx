"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';

export function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[110]"
                        onClick={closeCart}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-[120] flex flex-col shadow-dark"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="font-bebas text-3xl tracking-widest text-text">YOUR BAG</h2>
                            <button onClick={closeCart} className="text-text hover:text-accent-gold transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-text-muted">
                                    <p className="font-inter mb-4">Your bag is currently empty.</p>
                                    <button onClick={closeCart} className="text-accent-gold underline underline-offset-4 uppercase font-montserrat tracking-[2px] text-[11px]">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 border border-border bg-background-secondary relative group">
                                        <img src={item.image} alt={item.name} className="w-20 h-24 object-cover" />
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="font-inter text-sm font-bold text-text mb-2 line-clamp-2 pr-6">{item.name}</h3>
                                            <span className="font-montserrat text-accent-gold font-bold mb-auto">₹{item.price.toLocaleString('en-IN')}</span>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-border">
                                                    <button
                                                        className="px-3 py-1 text-text-muted hover:text-accent-gold"
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="font-inter text-sm w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        className="px-3 py-1 text-text-muted hover:text-accent-gold"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    className="text-text-muted hover:text-system-error transition-colors"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-border bg-background-secondary">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-inter text-text-muted">Subtotal</span>
                                    <span className="font-montserrat text-xl font-bold text-accent-gold">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="font-inter text-xs text-text-muted text-center mb-6">
                                    Shipping & taxes calculated at checkout
                                </p>
                                <button className="w-full bg-accent-gold text-background hover:bg-accent-gold-light py-4 font-montserrat uppercase tracking-[2px] font-bold transition-colors">
                                    Checkout Now
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
