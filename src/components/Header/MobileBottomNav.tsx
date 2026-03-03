"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, ShoppingBag, Grid } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';

export function MobileBottomNav() {
    const pathname = usePathname();
    const cartItems = useCartStore((state) => state.items);
    const wishlistItems = useWishlistStore((state) => state.items);
    const { openSearch } = useUIStore();
    const openCart = useCartStore((state) => state.openCart);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const navItems = [
        { icon: <Home size={22} />, label: 'Home', href: '/' },
        { icon: <Grid size={22} />, label: 'Categories', href: '/collections' },
        { icon: <Search size={22} />, label: 'Search', action: openSearch },
        { icon: <Heart size={22} />, label: 'Wishlist', href: '/wishlist', badge: wishlistItems.length },
        { icon: <ShoppingBag size={22} />, label: 'Cart', action: openCart, badge: cartCount },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-background/95 backdrop-blur-md border-t border-border z-[999] px-2 pb-safe">
            <div className="flex items-center justify-between h-full max-w-md mx-auto relative">
                {navItems.map((item, index) => {
                    const isActive = item.href ? pathname === item.href : false;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center justify-center">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`flex flex-col items-center justify-center gap-1 w-full relative ${isActive ? 'text-accent-gold' : 'text-text-muted hover:text-text'}`}
                                >
                                    <div className="relative">
                                        {item.icon}
                                        {item.badge ? (
                                            <span className="absolute -top-1 -right-2 w-4 h-4 bg-accent-gold rounded-full flex items-center justify-center text-[9px] text-background font-bold">
                                                {item.badge > 99 ? '99+' : item.badge}
                                            </span>
                                        ) : null}
                                    </div>
                                    {isActive && <div className="absolute -bottom-2 w-1 h-1 bg-accent-gold rounded-full" />}
                                </Link>
                            ) : (
                                <button
                                    onClick={item.action}
                                    className="flex flex-col items-center justify-center gap-1 w-full text-text-muted hover:text-text relative"
                                >
                                    <div className="relative">
                                        {item.icon}
                                        {item.badge ? (
                                            <span className="absolute -top-1 -right-2 w-4 h-4 bg-accent-gold rounded-full flex items-center justify-center text-[9px] text-background font-bold">
                                                {item.badge > 99 ? '99+' : item.badge}
                                            </span>
                                        ) : null}
                                    </div>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
