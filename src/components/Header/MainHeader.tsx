"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';

export function MainHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const cartItems = useCartStore((state) => state.items);
    const wishlistItems = useWishlistStore((state) => state.items);
    const { openSearch } = useUIStore();
    const openCart = useCartStore((state) => state.openCart);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Scroll effect for header bar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ESC key listener
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* 1. THE HEADER BAR */}
            <header
                className={`fixed left-0 right-0 top-0 z-[1000] w-full transition-all duration-300 ease-in-out ${isScrolled
                    ? 'bg-[#0B0B0D]/95 backdrop-blur-[20px] border-b border-[#1F1F25] h-[60px] md:h-[72px]'
                    : 'bg-transparent border-transparent h-[60px] md:h-[72px]'
                    }`}
            >
                <div className="w-full h-full px-[16px] md:px-[40px] flex items-center justify-between">

                    {/* LEFT: Hamburger & Logo */}
                    <div className="flex items-center gap-[16px]">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-[32px] h-[32px] cursor-pointer bg-transparent border-none p-[4px] z-[1001] flex flex-col justify-center items-center gap-[6px] relative"
                            aria-label="Toggle Menu"
                        >
                            <span className={`block w-[24px] h-[2px] bg-[#F5F5F7] transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                            <span className={`block w-[24px] h-[2px] bg-[#F5F5F7] transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block w-[24px] h-[2px] bg-[#F5F5F7] transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                        </button>

                        <Link href="/" onClick={closeMenu} className="text-decoration-none">
                            <span className="font-bebas text-[22px] tracking-[4px] text-[#C6A75E] select-none">
                                TANISHTRA
                            </span>
                        </Link>
                    </div>

                    {/* CENTER: Desktop Links (Hidden on Mobile) */}
                    <nav className="hidden md:flex items-center gap-[32px]">
                        <Link href="/collections" className="font-montserrat text-[13px] uppercase tracking-[2px] text-[#A1A1AA] hover:text-[#C6A75E] text-decoration-none transition-colors relative group">
                            COLLECTIONS
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C6A75E] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/collections" className="font-montserrat text-[13px] uppercase tracking-[2px] text-[#A1A1AA] hover:text-[#C6A75E] text-decoration-none transition-colors relative group">
                            BESTSELLERS
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C6A75E] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/collections" className="font-montserrat text-[13px] uppercase tracking-[2px] text-[#A1A1AA] hover:text-[#C6A75E] text-decoration-none transition-colors relative group">
                            NEW ARRIVALS
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C6A75E] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="font-montserrat text-[13px] uppercase tracking-[2px] text-[#A1A1AA] hover:text-[#C6A75E] text-decoration-none transition-colors relative group">
                            ABOUT
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C6A75E] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-[20px]">
                        <button onClick={openSearch} className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors cursor-pointer bg-transparent border-none p-0">
                            <Search size={20} />
                        </button>

                        <Link href="/wishlist" onClick={closeMenu} className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors cursor-pointer relative">
                            <Heart size={20} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-[16px] h-[16px] bg-[#C6A75E] text-[#0B0B0D] rounded-full flex items-center justify-center text-[10px] font-bold">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <button onClick={openCart} className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors cursor-pointer relative bg-transparent border-none p-0">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-[16px] h-[16px] bg-[#C6A75E] text-[#0B0B0D] rounded-full flex items-center justify-center text-[10px] font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </header>

            {/* 2. THE FULL-SCREEN MENU OVERLAY */}
            <div
                className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(11,11,13,0.97)] backdrop-blur-[10px] z-[999] transition-all duration-[400ms] ease-in-out flex flex-col justify-center items-start px-[24px] md:px-[40px] pt-[100px] md:pt-[80px] pb-[40px] overflow-y-auto ${menuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                {/* Main Links */}
                <div className="flex flex-col gap-[16px] w-full">
                    {[
                        { label: 'HOME', href: '/' },
                        { label: 'CHAINS', href: '/collections/chains' },
                        { label: 'LOCKET & CHAIN', href: '/collections/locket-chain' },
                        { label: 'BRACELETS', href: '/collections/bracelets' },
                        { label: 'KADA', href: '/collections/kada' },
                        { label: 'RINGS', href: '/collections/rings' },
                        { label: 'BESTSELLERS', href: '/collections/bestsellers' },
                        { label: 'NEW ARRIVALS', href: '/collections/new-arrivals' },
                        { label: 'ABOUT TANISHTRA', href: '/about' },
                        { label: 'CONTACT', href: '/contact' },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={closeMenu}
                            className="font-bebas text-[36px] md:text-[48px] text-[#F5F5F7] uppercase tracking-[3px] leading-[1.4] text-decoration-none block py-[8px] transition-all duration-300 ease-in-out hover:text-[#C6A75E] hover:translate-x-[12px]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Gold Divider Line */}
                <div className="w-[60px] h-[2px] bg-[#C6A75E] my-[24px]"></div>

                {/* Secondary Links */}
                <div className="flex flex-col">
                    {[
                        { label: 'Shipping Policy', href: '/shipping-policy' },
                        { label: 'Return Policy', href: '/return-policy' },
                        { label: 'Terms & Conditions', href: '/terms' },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={closeMenu}
                            className="font-inter text-[16px] text-[#A1A1AA] hover:text-[#C6A75E] text-decoration-none leading-[2.2] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="mt-[40px] flex flex-row gap-[24px]">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors">
                        <Instagram size={24} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors">
                        <Facebook size={24} />
                    </a>
                    <a href="https://wa.me/919594700173" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-[#C6A75E] transition-colors">
                        <MessageCircle size={24} />
                    </a>
                </div>
            </div>
        </>
    );
}
