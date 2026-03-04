"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Minus, Plus, Shield, Truck, Lock, ChevronDown, ShieldCheck, RotateCcw, Banknote, Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/product/ProductGallery';
import { RecentlyViewed } from '@/components/Ecommerce/RecentlyViewed';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState<string | null>('details');

    const [isAdded, setIsAdded] = useState(false);
    const addToCart = useCartStore(state => state.addItem);
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

    // Trust Elements State
    const [reviewsData, setReviewsData] = useState<any[]>([]);
    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', text: '', author: '', email: '' });
    const [hoveredStar, setHoveredStar] = useState(0);

    // Scroll tracking for sticky CTA
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky CTA when scrolled past 600px roughly on mobile
            if (window.scrollY > 600 && window.innerWidth < 768) {
                setShowStickyCTA(true);
            } else {
                setShowStickyCTA(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                const found = data.find(p => p.id === id);
                if (found) {
                    setProduct(found);
                    // Get 4 relative products from same category or fallback to bestsellers
                    let rel = data.filter(p => p.category === found.category && p.id !== found.id);
                    if (rel.length < 4) {
                        rel = [...rel, ...data.filter(p => p.isBestseller && p.id !== found.id)];
                    }
                    setRelated(rel.slice(0, 4));

                    // Track recently viewed
                    const saved = JSON.parse(localStorage.getItem('tanishtra-recently-viewed') || '[]');
                    const newSaved = [found.id, ...saved.filter((productId: string) => productId !== found.id)].slice(0, 10);
                    localStorage.setItem('tanishtra-recently-viewed', JSON.stringify(newSaved));
                }
                setIsLoading(false);
            })
            .catch(console.error);

        // Fetch Reviews
        fetch(`/api/reviews?productId=${id}`)
            .then(res => res.json())
            .then(data => setReviewsData(data))
            .catch(console.error);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-background text-center px-4">
                <h1 className="font-playfair text-4xl text-text mb-4">Product Not Found</h1>
                <p className="font-inter text-text-secondary mb-8">The armor you are looking for does not exist.</p>
                <Link href="/collections" className="bg-accent-gold text-background px-8 py-3 font-montserrat uppercase font-bold text-sm tracking-[1px] rounded">EXPLORE COLLECTIONS</Link>
            </div>
        );
    }

    const isLiked = wishlistItems.some(i => i.id === product.id);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const toggleWishlist = () => {
        if (isLiked) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'Tanishtra',
        },
        offers: {
            '@type': 'Offer',
            url: `https://tanishtra.com/products/${product.id}`,
            priceCurrency: 'INR',
            price: product.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability: (product.stock || 0) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating || 5,
            reviewCount: product.reviews || 1,
        },
    };

    const averageRating = reviewsData.length ? (reviewsData.reduce((acc, curr) => acc + curr.rating, 0) / reviewsData.length).toFixed(1) : (product.rating || 5).toFixed(1);

    return (
        <div className="bg-background min-h-screen pt-[100px] md:pt-[140px] pb-24 border-none outline-none overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 mb-8">
                <div className="font-inter text-[12px] text-text-muted flex items-center flex-wrap gap-2">
                    <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/collections" className="hover:text-accent-gold transition-colors">Collections</Link>
                    <span>/</span>
                    <Link href={`/collections/${product.category.toLowerCase().replace(' & ', '-')}`} className="hover:text-accent-gold transition-colors capitalize">
                        {product.category.toLowerCase()}
                    </Link>
                    <span>/</span>
                    <span className="text-text truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>

            {/* Main PDP Layout */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col gap-4 -mx-4 md:mx-0 pr-0 md:pr-4 lg:pr-10">
                        <ProductGallery
                            images={product.images ? {
                                primary: product.images.primary,
                                gallery: product.images.gallery || [product.image],
                                video: product.images.video
                            } : {
                                primary: product.image,
                                gallery: [product.image],
                            }}
                            productName={product.name}
                            badge={product.badge}
                        />
                    </div>

                    {/* Right: Product Info */}
                    <div className="lg:col-span-5 flex flex-col">

                        {/* Header / Price Area */}
                        <div className="mb-8">
                            <h1 className="font-bebas text-4xl md:text-[50px] text-text leading-[1.1] mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-accent-gold text-[16px]">
                                    {"★".repeat(Math.round(product.rating || 5))}
                                    {"☆".repeat(5 - Math.round(product.rating || 5))}
                                </div>
                                <span className="font-inter text-sm text-text-secondary">
                                    {product.rating || 5} · <span className="text-[#6B6B73] underline decoration-[#6B6B73]/50 cursor-pointer hover:text-accent-gold transition-colors" onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}>{reviewsData.length || product.reviews || 0} reviews</span>
                                </span>
                            </div>

                            <div className="flex items-end gap-3 mb-2">
                                <span className="font-montserrat text-[28px] md:text-[34px] font-bold text-accent-gold leading-none">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                <span className="font-inter text-[18px] text-text-muted line-through mb-1">
                                    ₹{(product.originalPrice || product.price).toLocaleString('en-IN')}
                                </span>
                                <span className="font-montserrat text-[12px] bg-system-success/20 text-[#6AAF7B] px-2 py-1 rounded uppercase font-bold mb-2">
                                    SAVE {product.discount || Math.round(((product.originalPrice || product.price) - product.price) / (product.originalPrice || product.price) * 100)}%
                                </span>
                            </div>
                            <p className="font-inter text-[13px] text-text-muted">Tax included. Shipping calculated at checkout.</p>

                            <div className="mt-4 py-3 px-4 bg-background-secondary rounded-md border border-border flex items-center gap-3">
                                <div className="w-8 h-4 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white">EMI</div>
                                <p className="font-inter text-sm text-text-secondary">
                                    Pay in 3 interest-free payments of <span className="text-text font-bold">₹{Math.ceil(product.price / 3).toLocaleString('en-IN')}</span>
                                </p>
                            </div>
                        </div>

                        {/* Description & Features */}
                        <div className="mb-10">
                            <p className="font-inter text-[16px] text-text-secondary leading-[1.7] mb-6">
                                {product.description} Engineered to enhance your natural presence without demanding attention.
                            </p>
                            <ul className="flex flex-col gap-3 font-inter text-[15px] text-text-secondary">
                                <li className="flex items-start gap-2"><span className="text-accent-gold font-bold">✓</span> Premium anti-tarnish coating</li>
                                <li className="flex items-start gap-2"><span className="text-accent-gold font-bold">✓</span> Hypoallergenic & sweat-resistant</li>
                                <li className="flex items-start gap-2"><span className="text-accent-gold font-bold">✓</span> Ergonomic weight distribution</li>
                            </ul>
                        </div>

                        {/* Actions & Delivery */}
                        <div className="flex flex-col gap-4 mb-10 pb-10 border-b border-border">
                            {/* 2F: Delivery Estimator */}
                            <div className="bg-transparent py-3 border-t border-[#1F1F25]">
                                <label className="font-inter text-[14px] text-[#F5F5F7] mb-2 block">📦 Check Delivery</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Pincode"
                                        className="bg-[#16161B] border border-[#1F1F25] w-[140px] h-[40px] px-3 text-[#F5F5F7] focus:border-[#C6A75E] focus:outline-none transition-colors"
                                    />
                                    <button
                                        onClick={() => {
                                            if (pincode.length === 6) {
                                                const d = new Date(); d.setDate(d.getDate() + 5);
                                                setDeliveryStatus(`✓ Delivery by ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} — FREE`);
                                            } else {
                                                setDeliveryStatus('Invalid');
                                            }
                                        }}
                                        className="bg-transparent border border-[#C6A75E] text-[#C6A75E] font-montserrat text-[12px] uppercase h-[40px] px-5 hover:bg-[rgba(198,167,94,0.1)] transition-colors"
                                    >
                                        Check
                                    </button>
                                </div>
                                {deliveryStatus && (
                                    <div className="mt-2">
                                        {deliveryStatus === 'Invalid' ? (
                                            <span className="font-inter text-[13px] text-[#D04242]">Enter a valid 6-digit pincode</span>
                                        ) : (
                                            <>
                                                <span className="font-inter text-[14px] text-[#4A7C59] block">{deliveryStatus}</span>
                                                <span className="font-inter text-[12px] text-[#A1A1AA]">Cash on Delivery available</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                {/* Qty Selector */}
                                <div className="flex items-center border border-[#2A2A2F] rounded h-[56px] w-[130px] bg-background">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center text-text-muted hover:text-accent-gold transition-colors">
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-montserrat text-[16px] font-bold text-text w-8 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center text-text-muted hover:text-accent-gold transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={toggleWishlist}
                                    className={`w-[56px] h-[56px] rounded border border-border flex items-center justify-center transition-all bg-background-secondary shrink-0 ${isLiked ? 'border-accent-gold' : 'hover:border-accent-gold'}`}
                                >
                                    <Heart size={22} className={isLiked ? 'fill-accent-gold text-accent-gold' : 'text-text'} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`w-full h-[60px] flex items-center justify-center font-montserrat text-[16px] uppercase tracking-[2px] font-bold rounded transition-all duration-300 mt-2 ${isAdded
                                    ? 'bg-system-success text-white shadow-[0_0_20px_rgba(74,124,89,0.4)]'
                                    : 'bg-accent-gold text-background hover:bg-accent-gold-light shadow-[0_4px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_4px_25px_rgba(198,167,94,0.5)]'
                                    }`}
                            >
                                {isAdded ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
                            </button>

                            <button
                                onClick={handleAddToCart}
                                className="w-full h-[60px] flex items-center justify-center font-montserrat text-[16px] uppercase tracking-[2px] font-bold rounded border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-background transition-colors duration-300"
                            >
                                BUY IT NOW
                            </button>

                            {product.stockText && (
                                <p className="font-montserrat text-[12px] uppercase text-urgency-amber text-center font-bold tracking-[1px] mt-2">
                                    ⚡ {product.stockText}
                                </p>
                            )}
                        </div>

                        {/* 2A: Trust Badges Bar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#121216] border border-[#1F1F25] rounded-lg p-4 md:px-5 mb-4">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck size={20} className="text-[#C6A75E] shrink-0" strokeWidth={1.5} />
                                <div className="flex flex-col">
                                    <span className="font-inter text-[13px] font-bold text-[#F5F5F7]">Secure Payment</span>
                                    <span className="font-inter text-[11px] text-[#6B6B73]">100% encrypted checkout</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Truck size={20} className="text-[#C6A75E] shrink-0" strokeWidth={1.5} />
                                <div className="flex flex-col">
                                    <span className="font-inter text-[13px] font-bold text-[#F5F5F7]">Free Shipping</span>
                                    <span className="font-inter text-[11px] text-[#6B6B73]">On orders above ₹999</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <RotateCcw size={20} className="text-[#C6A75E] shrink-0" strokeWidth={1.5} />
                                <div className="flex flex-col">
                                    <span className="font-inter text-[13px] font-bold text-[#F5F5F7]">7-Day Easy Returns</span>
                                    <span className="font-inter text-[11px] text-[#6B6B73]">Hassle-free return policy</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Banknote size={20} className="text-[#C6A75E] shrink-0" strokeWidth={1.5} />
                                <div className="flex flex-col">
                                    <span className="font-inter text-[13px] font-bold text-[#F5F5F7]">COD Available</span>
                                    <span className="font-inter text-[11px] text-[#6B6B73]">Pay on delivery pan-India</span>
                                </div>
                            </div>
                        </div>

                        {/* 2B: Product Guarantees Strip */}
                        <div className="bg-transparent border border-[#1F1F25] rounded-lg p-5 mb-10">
                            <h4 className="font-montserrat text-[11px] uppercase text-[#C6A75E] tracking-[2px] mb-3">Tanishtra Guarantee</h4>
                            <ul className="flex flex-col gap-2">
                                {["Anti-tarnish stainless steel", "Hypoallergenic — safe for sensitive skin", "Premium gold ion plating", "Lifetime polish warranty", "Authentic quality certification"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span className="text-[#4A7C59] font-bold text-[14px]">✓</span>
                                        <span className="font-inter text-[14px] text-[#A1A1AA]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>



                        {/* Accordions */}
                        <div className="flex flex-col border-t border-border">
                            {[
                                { id: 'details', title: 'Details & Specifications', content: 'Crafted using 316L Stainless Steel core with premium PVD plating. Hypoallergenic design ensures no skin irritation. Each piece undergoes 4 stages of quality control testing.' },
                                { id: 'shipping', title: 'Shipping & Returns', content: 'Free standard shipping on all orders above ₹999. Expected delivery within 3-5 business days. 7-day hassle-free return policy if tags are maintained.' },
                                { id: 'guide', title: 'Sizing Guide', content: 'Ring sizes are modeled on US standards. Chains come in 20", 22", and 24" lengths, resting optimally at the mid-chest level for adult men.' }
                            ].map((acc) => (
                                <div key={acc.id} className="border-b border-border">
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                                        className="w-full py-5 flex items-center justify-between group"
                                    >
                                        <span className="font-montserrat text-[13px] uppercase font-bold tracking-[1px] text-text group-hover:text-accent-gold transition-colors">{acc.title}</span>
                                        <ChevronDown size={18} className={`text-text-muted transition-transform duration-300 ${openAccordion === acc.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === acc.id ? 'max-h-[200px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                                        <p className="font-inter text-[14px] text-text-secondary leading-[1.7]">{acc.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* 2C/2D/2E: Reviews Section */}
                <div id="reviews-section" className="mt-16 md:mt-24 border-t border-border pt-16">
                    <h2 className="font-montserrat text-[14px] uppercase text-accent-gold tracking-[2px] mb-6">Customer Reviews</h2>

                    {/* 2C: Detailed Rating Summary */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 bg-background-secondary border border-border rounded-lg p-6 md:p-8 mb-10">
                        {/* Left Side */}
                        <div className="flex flex-col items-center justify-center min-w-[150px]">
                            <span className="font-bebas text-[56px] text-accent-gold leading-none">{averageRating}</span>
                            <div className="flex text-accent-gold text-[20px] my-2">
                                {"★".repeat(Math.round(Number(averageRating)))}
                                {"☆".repeat(5 - Math.round(Number(averageRating)))}
                            </div>
                            <span className="font-inter text-[13px] text-[#6B6B73]">out of 5</span>
                            <span className="font-inter text-[12px] text-[#A1A1AA] mt-1">Based on {reviewsData.length} reviews</span>
                        </div>

                        {/* Right Side - Bars */}
                        <div className="flex-1 flex flex-col gap-3 justify-center">
                            {[5, 4, 3, 2, 1].map(star => {
                                const count = reviewsData.filter(r => r.rating === star).length;
                                const pct = reviewsData.length ? Math.round((count / reviewsData.length) * 100) : 0;
                                return (
                                    <div key={star} className="flex items-center gap-4">
                                        <span className="font-inter text-[13px] text-[#A1A1AA] w-6">{star} ★</span>
                                        <div className="flex-1 h-2 bg-[#2A2A2F] rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="font-inter text-[12px] text-[#6B6B73] w-10 text-right">{pct}%</span>
                                        <span className="font-inter text-[12px] text-[#6B6B73] w-20 text-right hidden sm:block">({count} {count === 1 ? 'review' : 'reviews'})</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2D: Individual Reviews */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-inter text-[16px] font-bold text-text">{reviewsData.length} Reviews</h3>
                        <div className="relative group">
                            <select className="appearance-none bg-background-secondary border border-border text-text font-inter text-[13px] py-2 pl-4 pr-10 rounded-md focus:outline-none focus:border-accent-gold cursor-pointer">
                                <option>Most Recent</option>
                                <option>Highest Rated</option>
                                <option>Lowest Rated</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-10">
                        {reviewsData.map((review: any) => (
                            <div key={review.id} className="bg-background-secondary border border-border rounded-lg p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex text-accent-gold text-[14px]">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </div>
                                    <span className="font-inter text-[12px] text-[#6B6B73]">{review.date}</span>
                                </div>
                                {review.title && <h4 className="font-inter text-[16px] font-bold text-text mb-2">{review.title}</h4>}
                                <p className="font-inter text-[14px] text-[#A1A1AA] leading-[1.6] mb-4">{review.text}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-inter text-[14px] font-bold text-text">{review.author}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-inter text-[12px] text-[#6B6B73]">{review.location}</span>
                                            {review.verified && (
                                                <span className="flex items-center gap-1 font-montserrat text-[10px] text-[#4A7C59]">
                                                    <CheckCircle size={10} /> Verified Purchase
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center gap-1.5 text-[#6B6B73] hover:text-accent-gold transition-colors font-inter text-[12px] group/btn"
                                        onClick={(e) => {
                                            const el = e.currentTarget;
                                            el.classList.add('text-accent-gold');
                                            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg> Was this helpful? (${review.helpfulCount + 1})`;
                                        }}
                                    >
                                        <ThumbsUp size={14} className="group-hover/btn:fill-accent-gold" /> Was this helpful? ({review.helpfulCount})
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2E: Write a Review */}
                    {!isReviewFormOpen ? (
                        <button
                            onClick={() => setIsReviewFormOpen(true)}
                            className="bg-transparent border border-[#2A2A2F] text-[#A1A1AA] font-montserrat text-[13px] uppercase px-8 py-3 hover:border-accent-gold hover:text-accent-gold transition-colors"
                        >
                            Write a Review
                        </button>
                    ) : (
                        <div className="bg-background-secondary border border-border rounded-lg p-6 md:p-8 animate-in slide-in-from-top-4 fade-in duration-300">
                            <h4 className="font-playfair text-[24px] text-text mb-6">Write a Review</h4>

                            <div className="mb-6">
                                <label className="font-inter text-[13px] text-text-secondary mb-2 block">Overall Rating *</label>
                                <div className="flex gap-2" onMouseLeave={() => setHoveredStar(0)}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors ${(hoveredStar || reviewForm.rating) >= star ? 'fill-accent-gold text-accent-gold' : 'text-[#2A2A2F]'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="font-inter text-[13px] text-text-secondary mb-2 block">Your Name *</label>
                                    <input
                                        type="text"
                                        value={reviewForm.author}
                                        onChange={e => setReviewForm({ ...reviewForm, author: e.target.value })}
                                        className="w-full bg-background border border-[#2A2A2F] rounded p-3 text-text font-inter focus:border-accent-gold focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="font-inter text-[13px] text-text-secondary mb-2 block">Your Email *</label>
                                    <input
                                        type="email"
                                        value={reviewForm.email}
                                        onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })}
                                        className="w-full bg-background border border-[#2A2A2F] rounded p-3 text-text font-inter focus:border-accent-gold focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="font-inter text-[13px] text-text-secondary mb-2 block">Review Title</label>
                                <input
                                    type="text"
                                    placeholder="Summarize your experience"
                                    value={reviewForm.title}
                                    onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })}
                                    className="w-full bg-background border border-[#2A2A2F] rounded p-3 text-text font-inter focus:border-accent-gold focus:outline-none"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="font-inter text-[13px] text-text-secondary mb-2 block">Review Details</label>
                                <textarea
                                    placeholder="Share details about quality, fit, and style..."
                                    value={reviewForm.text}
                                    onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })}
                                    className="w-full bg-background border border-[#2A2A2F] rounded p-3 text-text font-inter focus:border-accent-gold focus:outline-none min-h-[120px] resize-y"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        if (reviewForm.rating === 0 || !reviewForm.author) {
                                            alert("Please provide a rating and your name.");
                                            return;
                                        }
                                        fetch('/api/reviews', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ ...reviewForm, productId: id })
                                        }).then(() => {
                                            alert("Thank you! Your review has been submitted and will appear after verification.");
                                            setIsReviewFormOpen(false);
                                            setReviewForm({ rating: 0, title: '', text: '', author: '', email: '' });
                                            window.location.reload();
                                        });
                                    }}
                                    className="bg-accent-gold text-background font-montserrat text-[13px] font-bold uppercase px-8 py-3 rounded hover:bg-accent-gold-light transition-colors"
                                >
                                    Submit Review
                                </button>
                                <button
                                    onClick={() => setIsReviewFormOpen(false)}
                                    className="text-text-muted hover:text-text font-inter text-[14px]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Suggested Products */}
            {related.length > 0 && (
                <section className="bg-background-secondary border-t border-border py-20 px-4 md:px-8">
                    <div className="max-w-[1320px] mx-auto">
                        <h2 className="font-playfair text-[32px] md:text-[42px] text-text mb-10 text-center">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {related.map(p => (
                                <ProductCard key={p.id} product={p} variant="bestseller" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Recently Viewed */}
            <RecentlyViewed currentProductId={product.id} />

            {/* Mobile Sticky Add To Cart */}
            <AnimatePresence>
                {showStickyCTA && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="md:hidden fixed bottom-[60px] left-0 right-0 p-3 bg-[#0B0B0D]/95 backdrop-blur-md border-t border-[#1F1F25] z-[900] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
                    >
                        <div className="flex items-center justify-between gap-3 max-w-[500px] mx-auto">
                            <div className="flex flex-col flex-1 pb-1">
                                <span className="font-inter text-[13px] font-bold text-[#F5F5F7] line-clamp-1">{product.name}</span>
                                <span className="font-montserrat text-[12px] text-[#C6A75E] font-bold tracking-[1px]">₹{product.price.toLocaleString('en-IN')}</span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className={`h-[44px] px-6 flex items-center justify-center font-montserrat text-[12px] uppercase tracking-[1px] font-bold rounded-[4px] transition-all duration-300 whitespace-nowrap ${isAdded ? 'bg-[#4A7C59] text-white' : 'bg-[#C6A75E] text-[#0B0B0D]'
                                    }`}
                            >
                                {isAdded ? '✓ ADDED' : 'ADD TO BAG'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
