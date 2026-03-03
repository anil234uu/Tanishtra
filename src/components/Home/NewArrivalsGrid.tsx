import React from 'react';
import Link from 'next/link';
import { ProductCard, type Product } from '@/components/ui/ProductCard';

export function NewArrivalsGrid() {
    const newArrivals: Product[] = [
        {
            id: "n1",
            name: "Green Aventurine Bracelet (Golden Glow Edition)",
            price: 899,
            category: "Bracelet",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
            isNew: true,
            rating: 5.0,
            reviews: 12
        },
        {
            id: "n2",
            name: "Carnelian Bracelet (Firecore Gold Edition)",
            price: 899,
            category: "Bracelet",
            image: "https://images.unsplash.com/photo-1599643477874-ceade8ea205f?auto=format&fit=crop&q=80&w=800",
            isNew: true,
            rating: 4.8,
            reviews: 8
        },
        {
            id: "n3",
            name: "Devil Locket And Chain For Men",
            price: 699,
            category: "Locket",
            image: "https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=800",
            isNew: true,
            rating: 4.9,
            reviews: 15
        },
        {
            id: "n4",
            name: "Box Chain For Men (Golden)",
            price: 749,
            category: "Chain",
            image: "https://images.unsplash.com/photo-1573408301145-b98c46544ea0?auto=format&fit=crop&q=80&w=800",
            isNew: true,
            rating: 4.7,
            reviews: 24
        }
    ];

    return (
        <section className="py-24 bg-background-secondary border-b border-border">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
                <div className="text-center mb-16">
                    <span className="font-montserrat text-[11px] text-accent-gold uppercase tracking-[2px] block mb-2">Just Dropped</span>
                    <h2 className="font-bebas text-5xl tracking-widest text-text mb-6">NEW ARRIVALS</h2>
                    <p className="font-inter text-text-muted">Fresh styles added this week</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {newArrivals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-background font-montserrat text-[11px] uppercase tracking-[2px] px-8 py-3 transition-colors">
                        View the Drop
                    </button>
                </div>
            </div>
        </section>
    );
}
