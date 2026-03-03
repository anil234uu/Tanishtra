import React from 'react';
import Link from 'next/link';
import { CategoryGrid } from '@/components/Home/CategoryGrid';

export const metadata = {
    title: "Collections | Tanishtra",
    description: "Explore our premium collections of men's chains, rings, bracelets, and lockets.",
};

export default function CollectionsIndexPage() {
    return (
        <div className="bg-background min-h-screen">

            {/* Hero */}
            <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629814434298-6ce0af31a980?auto=format&fit=crop&q=80&w=1920)' }}
                />
                <div className="absolute inset-0 bg-background/80" />

                <div className="relative z-10 text-center px-4">
                    <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">
                        THE CATALOG
                    </span>
                    <h1 className="font-bebas text-5xl md:text-7xl tracking-[4px] text-text">
                        OUR COLLECTIONS
                    </h1>
                </div>
            </section>

            {/* Since we already built a perfect category grid, we can just reuse it here */}
            <div className="py-12">
                <CategoryGrid />
            </div>

        </div>
    );
}
