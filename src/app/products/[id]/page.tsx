"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Minus, Plus, Shield, Truck, Lock, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [openAccordion, setOpenAccordion] = useState<string | null>('details');

    const [isAdded, setIsAdded] = useState(false);
    const addToCart = useCartStore(state => state.addItem);
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

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
                }
                setIsLoading(false);
            })
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

    return (
        <div className="bg-background min-h-screen pt-[100px] md:pt-[140px] pb-24 border-none outline-none overflow-x-hidden">

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
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="w-full aspect-[4/5] md:aspect-square bg-background-secondary rounded-xl overflow-hidden relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Badges */}
                            {(product.isBestseller || product.badge) && (
                                <div className="absolute top-4 left-4 bg-accent-gold text-background px-3 py-1.5 z-10 font-montserrat text-[12px] uppercase font-bold rounded shadow-[0_0_15px_rgba(198,167,94,0.3)]">
                                    {product.badge || 'BESTSELLER'}
                                </div>
                            )}
                        </div>

                        {/* Thumbnails (Simulated multiple angles of same product variant) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3].map((num, idx) => (
                                <button
                                    key={num}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-square rounded-md overflow-hidden bg-background-secondary border-2 transition-all ${activeImage === idx ? 'border-accent-gold scale-100 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
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
                                    {"★".repeat(Math.floor(product.rating || 5))}
                                    {"☆".repeat(5 - Math.floor(product.rating || 5))}
                                </div>
                                <span className="font-inter text-sm text-text-secondary border-b border-text-secondary/30 pb-0.5 cursor-pointer hover:text-accent-gold transition-colors">
                                    {product.rating || 5} ({product.reviews || 0} Reviews)
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

                        {/* Actions (Qty + ATB) */}
                        <div className="flex flex-col gap-4 mb-10 pb-10 border-b border-border">
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
                                className={`w-full h-[60px] flex items-center justify-center font-montserrat text-[16px] uppercase tracking-[2px] font-bold rounded transition-all duration-300 ${isAdded
                                    ? 'bg-system-success text-white shadow-[0_0_20px_rgba(74,124,89,0.4)]'
                                    : 'bg-accent-gold text-background hover:bg-accent-gold-light shadow-[0_4px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_4px_25px_rgba(198,167,94,0.5)]'
                                    }`}
                            >
                                {isAdded ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
                            </button>

                            {product.stockText && (
                                <p className="font-montserrat text-[12px] uppercase text-urgency-amber text-center font-bold tracking-[1px] mt-2">
                                    ⚡ {product.stockText}
                                </p>
                            )}
                        </div>

                        {/* Trust Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-10 bg-background-secondary border border-border rounded-lg p-5">
                            <div className="flex flex-col items-center justify-center text-center gap-2">
                                <Truck size={24} className="text-text" strokeWidth={1.5} />
                                <span className="font-inter text-[11px] text-text-muted uppercase font-bold tracking-[1px]">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2">
                                <Shield size={24} className="text-text" strokeWidth={1.5} />
                                <span className="font-inter text-[11px] text-text-muted uppercase font-bold tracking-[1px]">Lifetime Polish</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2">
                                <Lock size={24} className="text-text" strokeWidth={1.5} />
                                <span className="font-inter text-[11px] text-text-muted uppercase font-bold tracking-[1px]">Secure Checkout</span>
                            </div>
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

            {/* Mobile Sticky Add To Cart */}
            <div className="md:hidden fixed bottom-[64px] left-0 right-0 p-3 bg-background/95 backdrop-blur-md border-t border-border z-[900]">
                <button
                    onClick={handleAddToCart}
                    className={`w-full h-[50px] flex items-center justify-center font-montserrat text-[14px] uppercase tracking-[1px] font-bold rounded transition-all duration-300 ${isAdded ? 'bg-system-success text-white' : 'bg-accent-gold text-background'
                        }`}
                >
                    {isAdded ? '✓ ADDED TO BAG' : `ADD TO BAG - ₹${product.price.toLocaleString('en-IN')}`}
                </button>
            </div>

        </div>
    );
}
