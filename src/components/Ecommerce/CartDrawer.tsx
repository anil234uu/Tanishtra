"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, Truck, ShieldCheck, RefreshCcw, CreditCard, Sparkles, Clock } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useRecentlyViewed } from '@/lib/store/useRecentlyViewed';

const FREE_SHIPPING_THRESHOLD = 999;

export function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, addItem } = useCartStore();
    const [cartNote, setCartNote] = useState('');
    const { items: recentlyViewedItems } = useRecentlyViewed();
    const recentNotInCart = recentlyViewedItems.filter(rv => !items.find(cartItem => cartItem.id === rv.id));

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const isUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;

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
                        <div className="flex items-center justify-between p-6 border-b border-[#1F1F25]">
                            <h2 className="font-bebas text-3xl tracking-widest text-[#F5F5F7]">YOUR BAG</h2>
                            <button onClick={closeCart} className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Dynamic Shipping Bar */}
                        <div className="p-5 border-b border-[#1F1F25] bg-[#121216]">
                            <div className="flex justify-between items-end mb-2">
                                <span className={`font-montserrat text-[11px] uppercase tracking-[1px] font-bold ${isUnlocked ? 'text-[#4A7C59]' : 'text-[#C6A75E]'}`}>
                                    {isUnlocked ? '🎉 FREE SHIPPING UNLOCKED' : `YOU ARE ₹${remaining.toLocaleString('en-IN')} AWAY FROM FREE SHIPPING!`}
                                </span>
                            </div>
                            <div className="w-full h-[6px] bg-[#1F1F25] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`h-full rounded-full ${isUnlocked ? 'bg-[#4A7C59]' : 'bg-[#C6A75E]'}`}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-[#2A2A2F]">
                            {items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-text-muted">
                                    <p className="font-inter mb-4">Your bag is currently empty.</p>
                                    <button onClick={closeCart} className="text-accent-gold underline underline-offset-4 uppercase font-montserrat tracking-[2px] text-[11px]">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 border border-[#2A2A2F] bg-[#16161B] relative group rounded-md">
                                        <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm" />
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="font-inter text-sm font-bold text-[#F5F5F7] mb-1 line-clamp-2 pr-6">{item.name}</h3>
                                            {item.size && <span className="font-inter text-[12px] text-[#A1A1AA] mb-1">Size: {item.size}</span>}
                                            <span className="font-montserrat text-[#C6A75E] font-bold mb-auto tracking-[1px]">₹{item.price.toLocaleString('en-IN')}</span>

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

                            {/* Cart Note */}
                            {items.length > 0 && (
                                <div className="mt-4 border-t border-[#1F1F25] pt-6">
                                    <label htmlFor="cart-note" className="block font-inter text-[13px] text-[#A1A1AA] mb-2 uppercase tracking-[1px] font-bold">
                                        Add Gift Message / Order Note
                                    </label>
                                    <textarea
                                        id="cart-note"
                                        rows={2}
                                        value={cartNote}
                                        onChange={(e) => setCartNote(e.target.value)}
                                        placeholder="Special instructions for seller..."
                                        className="w-full bg-[#0B0B0D] border border-[#2A2A2F] rounded-md p-3 text-[14px] font-inter text-[#F5F5F7] focus:outline-none focus:border-[#C6A75E] transition-colors resize-none placeholder:text-[#6B6B73]"
                                    />
                                </div>
                            )}

                            {/* Recently Viewed (Cart Upsell) */}
                            {items.length > 0 && recentNotInCart.length > 0 && (
                                <div className="mt-2 pt-6 border-t border-[#1F1F25]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Clock size={16} className="text-[#C6A75E]" />
                                        <h3 className="font-montserrat text-[12px] uppercase tracking-[2px] font-bold text-[#F5F5F7]">Recently Viewed</h3>
                                    </div>
                                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                        {recentNotInCart.map(product => (
                                            <div key={product.id} className="snap-start shrink-0 w-[140px] flex flex-col gap-2 p-2 border border-[#2A2A2F] bg-[#0B0B0D] rounded-md">
                                                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-sm" />
                                                <div className="flex flex-col flex-1">
                                                    <span className="font-inter text-[12px] font-bold text-[#F5F5F7] line-clamp-1">{product.name}</span>
                                                    <span className="font-montserrat text-[#C6A75E] font-bold text-[12px] mb-2">₹{product.price.toLocaleString('en-IN')}</span>
                                                    <button
                                                        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, size: undefined })}
                                                        className="w-full h-7 rounded border border-[#C6A75E] flex items-center justify-center hover:bg-[#C6A75E] hover:text-[#0B0B0D] transition-colors text-[#C6A75E] font-montserrat text-[10px] uppercase font-bold"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-[#1F1F25] bg-[#121216] flex flex-col gap-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-inter text-[#A1A1AA] text-[15px]">Subtotal</span>
                                    <span className="font-montserrat text-xl font-bold text-[#F5F5F7]">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="font-inter text-[12px] text-[#A1A1AA] text-center">
                                    Estimated Delivery: <span className="text-[#C6A75E] font-bold">Within 3-5 Working Days</span>
                                </p>

                                <button className="w-full bg-[#C6A75E] text-[#0B0B0D] hover:bg-[#D8B76A] py-4 rounded-[4px] font-montserrat uppercase tracking-[2px] font-bold transition-colors">
                                    CHECKOUT SECURELY
                                </button>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#1F1F25] mt-2">
                                    <div className="flex flex-col items-center justify-center text-center gap-1.5 opacity-70">
                                        <ShieldCheck size={18} className="text-[#C6A75E]" />
                                        <span className="font-inter text-[9px] uppercase text-[#6B6B73] leading-tight">Secure<br />Pay</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center text-center gap-1.5 opacity-70">
                                        <Truck size={18} className="text-[#C6A75E]" />
                                        <span className="font-inter text-[9px] uppercase text-[#6B6B73] leading-tight">{isUnlocked ? 'Free' : 'Fast'}<br />Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center text-center gap-1.5 opacity-70">
                                        <RefreshCcw size={18} className="text-[#C6A75E]" />
                                        <span className="font-inter text-[9px] uppercase text-[#6B6B73] leading-tight">Easy<br />Returns</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center text-center gap-1.5 opacity-70">
                                        <CreditCard size={18} className="text-[#C6A75E]" />
                                        <span className="font-inter text-[9px] uppercase text-[#6B6B73] leading-tight">COD<br />Available</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
