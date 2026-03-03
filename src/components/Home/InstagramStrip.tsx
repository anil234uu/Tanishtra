import React from 'react';
import { Instagram } from 'lucide-react';

const INSTA_POSTS = [
    "https://images.unsplash.com/photo-1599643478514-46b1981da96e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1611591437158-7c858b29ec17?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1573408301145-b98c46544ea0?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1629814434298-6ce0af31a980?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1617331566373-d1ea2cb5dc2f?auto=format&fit=crop&q=80&w=400"
];

export function InstagramStrip() {
    return (
        <section className="bg-background pt-[60px] pb-[40px]">

            <div className="text-center mb-8">
                <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[3px] block mb-2">
                    FOLLOW THE MOVEMENT
                </span>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-montserrat text-[14px] text-accent-gold hover:text-accent-gold-light transition-colors"
                >
                    @tanishtra
                </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1 w-full max-w-[1920px] mx-auto pb-10">
                {INSTA_POSTS.map((img, idx) => (
                    <a
                        key={idx}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden block"
                    >
                        <img
                            src={img}
                            alt="Instagram photo"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/30 transition-colors duration-300 flex items-center justify-center">
                            <Instagram size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" />
                        </div>
                    </a>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-transparent border border-[#2A2A2F] text-text-secondary font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[32px] py-[12px] rounded hover:border-accent-gold hover:text-accent-gold transition-colors"
                >
                    FOLLOW @TANISHTRA ON INSTAGRAM
                </a>
            </div>

        </section>
    );
}
