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
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "72px",
                    zIndex: 1000,
                    backgroundColor: isScrolled ? "rgba(11, 11, 13, 0.95)" : "transparent",
                    backdropFilter: isScrolled ? "blur(20px)" : "none",
                    borderBottom: isScrolled ? "1px solid #1F1F25" : "1px solid transparent",
                    transition: "all 300ms ease-in-out",
                }}
            >
                <div className="w-full h-full px-[16px] md:px-[40px] flex items-center justify-between">

                    {/* LEFT: Hamburger & Logo */}
                    <div className="flex items-center gap-[16px]">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-[32px] h-[32px] cursor-pointer bg-transparent border-none p-[4px] z-[1002] flex flex-col justify-center items-center gap-[6px] relative"
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

            {/* 2. THE FULL-SCREEN MENU OVERLAY — FIXED VERSION */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(11, 11, 13, 0.97)",
                    backdropFilter: "blur(10px)",
                    zIndex: 999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    paddingTop: "100px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    paddingBottom: "40px",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
                    opacity: menuOpen ? 1 : 0,
                    transition: "transform 400ms ease, opacity 300ms ease",
                    pointerEvents: menuOpen ? ("auto" as const) : ("none" as const),
                }}
            >
                {/* ── Main Navigation Links ── */}
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        width: "100%",
                    }}
                >
                    {[
                        { name: "HOME", href: "/" },
                        { name: "CHAINS", href: "/collections/chains" },
                        { name: "LOCKET & CHAIN", href: "/collections/locket-chain" },
                        { name: "BRACELETS", href: "/collections/bracelets" },
                        { name: "KADA", href: "/collections/kada" },
                        { name: "RINGS", href: "/collections/rings" },
                        { name: "BESTSELLERS", href: "/collections/bestsellers" },
                        { name: "NEW ARRIVALS", href: "/collections/new-arrivals" },
                        { name: "ABOUT TANISHTRA", href: "/about" },
                        { name: "CONTACT", href: "/contact" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                                fontSize: "clamp(26px, 5vw, 48px)",
                                color: "#F5F5F7",
                                textTransform: "uppercase" as const,
                                letterSpacing: "3px",
                                lineHeight: "1.5",
                                textDecoration: "none",
                                cursor: "pointer",
                                padding: "6px 0",
                                display: "block",
                                transition: "color 300ms ease, transform 300ms ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#C6A75E";
                                e.currentTarget.style.transform = "translateX(8px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#F5F5F7";
                                e.currentTarget.style.transform = "translateX(0)";
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* ── Gold Divider ── */}
                <div
                    style={{
                        width: "50px",
                        height: "2px",
                        backgroundColor: "#C6A75E",
                        margin: "20px 0",
                    }}
                />

                {/* ── Secondary Links ── */}
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                    }}
                >
                    {[
                        { name: "Shipping Policy", href: "/shipping-policy" },
                        { name: "Return Policy", href: "/return-policy" },
                        { name: "Terms & Conditions", href: "/terms" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "15px",
                                color: "#A1A1AA",
                                textDecoration: "none",
                                cursor: "pointer",
                                padding: "5px 0",
                                lineHeight: "2",
                                transition: "color 300ms ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#C6A75E")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* ── Social Icons ── */}
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "32px",
                    }}
                >
                    <a
                        href="https://instagram.com/tanishtra"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#A1A1AA",
                            transition: "color 300ms ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C6A75E")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                    </a>
                    <a
                        href="https://facebook.com/tanishtra"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#A1A1AA",
                            transition: "color 300ms ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C6A75E")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    <a
                        href="https://wa.me/919594700173"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#A1A1AA",
                            transition: "color 300ms ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C6A75E")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}
