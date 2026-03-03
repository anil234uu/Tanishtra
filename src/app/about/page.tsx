import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "About Us | Tanishtra",
    description: "The story of Tanishtra. Engineered for presence and built for everyday dominance.",
};

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen pb-20">

            {/* Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617331566373-d1ea2cb5dc2f?auto=format&fit=crop&q=80&w=1920)' }}
                />
                <div className="absolute inset-0 bg-background/70" />

                <div className="relative z-10 text-center px-4">
                    <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">
                        EST. 2026
                    </span>
                    <h1 className="font-bebas text-5xl md:text-7xl tracking-[4px] text-text">
                        THE TANISHTRA STORY
                    </h1>
                </div>
            </section>

            {/* Main Content Layout */}
            <section className="max-w-[1320px] mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">

                    {/* Left: Sticky Sidebar */}
                    <div className="md:w-1/3">
                        <div className="sticky top-[100px]">
                            <h2 className="font-playfair text-[32px] md:text-[42px] text-text mb-6 leading-tight">
                                Not Just Accessories.<br />Armor for the Modern Man.
                            </h2>
                            <p className="font-montserrat text-[13px] uppercase tracking-[2px] text-accent-gold font-bold">
                                Our Philosophy
                            </p>

                            <div className="hidden md:block w-12 h-[2px] bg-accent-gold mt-12 mb-8" />

                            <div className="hidden md:flex flex-col gap-6 text-text-muted font-inter text-sm">
                                <div>
                                    <strong className="text-text block mb-1">Based In</strong>
                                    Mumbai, India
                                </div>
                                <div>
                                    <strong className="text-text block mb-1">Materials</strong>
                                    Premium Alloys, Anti-Tarnish Finishes, High-Grade Ceramic
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Rich Text Story */}
                    <div className="md:w-2/3 max-w-[700px]">
                        <div className="prose prose-invert prose-p:font-inter prose-p:text-[16px] prose-p:text-text-secondary prose-p:leading-[1.8] prose-h3:font-playfair prose-h3:text-[28px] prose-h3:text-text prose-h3:mt-12 prose-h3:mb-6">
                            <p className="text-[20px] leading-[1.6] text-text mb-10">
                                In a world of mass-produced mediocrity, Tanishtra exists for men who understand that details define the man.
                            </p>

                            <p>
                                A man's presence speaks volumes before he even utters a word. It's in the way he carries himself, the confidence in his stride, and the subtle, defining details of his style. For too long, men's jewelry has been an afterthought — flimsy designs, tarnishing metals, or overly flashy pieces that distract rather than enhance.
                            </p>
                            <p>
                                Tanishtra was born from the desire to change this narrative. We believe that accessories are not just decorations; they are armor. Every chain we craft, every ring we forge, carries the weight of intention. It is designed to amplify your presence, not overshadow it.
                            </p>

                            <h3>Engineered for Dominance</h3>
                            <p>
                                Our design philosophy is rooted in architectural minimalism and unwavering durability. We draw inspiration from the raw power of industrial structures and the refined elegance of classic masculine style.
                            </p>
                            <p>
                                We don't do delicate. Our Cuban and Snake chains are built with heavy-duty clasps and substantial weight, feeling solid against the skin. Our TitanCore and Eternum rings employ high-grade ceramic and precision-engineered metals designed to withstand the rigors of everyday life.
                            </p>

                            <h3>The Anti-Tarnish Promise</h3>
                            <p>
                                At Tanishtra, quality is non-negotiable. Every brass-based product undergoes a rigorous multi-layer plating process and is sealed with a premium anti-tarnish coating. This ensures that your armor retains its brilliant, polished finish, maintaining its commanding aura through sweat, wear, and time.
                            </p>
                            <p>
                                Based in the vibrant heart of Mumbai, but serving men across the nation, Tanishtra is more than a brand — it is a standard.
                            </p>
                        </div>

                        {/* In-content Gallery Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-16 mb-16">
                            <div className="col-span-2 h-[300px] bg-background-secondary rounded-lg overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200" alt="Craftsmanship" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="h-[240px] bg-background-secondary rounded-lg overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1599643477874-ceade8ea205f?auto=format&fit=crop&q=80&w=800" alt="Details" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                            </div>
                            <div className="h-[240px] bg-background-secondary rounded-lg overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=800" alt="Presence" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="border-t border-border pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="font-playfair text-2xl text-text mb-2">Ready to upgrade?</h4>
                                <p className="font-inter text-text-secondary">Find the piece that defines you.</p>
                            </div>
                            <Link
                                href="/collections"
                                className="bg-accent-gold text-background hover:bg-accent-gold-light transition-colors font-montserrat text-[14px] uppercase font-bold px-8 py-4 w-full md:w-auto text-center"
                            >
                                EXPLORE COLLECTION
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
