"use client";
import React from 'react';
import { Instagram } from 'lucide-react';

interface InstaPost {
    img: string;
    user: string;
    link?: string;
}

const FALLBACK_POSTS: InstaPost[] = [
    { img: "https://images.unsplash.com/photo-1599643478514-46b1981da96e?auto=format&fit=crop&q=80&w=400", user: "@varun_style" },
    { img: "https://images.unsplash.com/photo-1611591437158-7c858b29ec17?auto=format&fit=crop&q=80&w=400", user: "@arjunsingh" },
    { img: "https://images.unsplash.com/photo-1573408301145-b98c46544ea0?auto=format&fit=crop&q=80&w=400", user: "@thekaran" },
    { img: "https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=400", user: "@rohit_menswear" },
    { img: "https://images.unsplash.com/photo-1629814434298-6ce0af31a980?auto=format&fit=crop&q=80&w=400", user: "@suresh_k" },
    { img: "https://images.unsplash.com/photo-1617331566373-d1ea2cb5dc2f?auto=format&fit=crop&q=80&w=400", user: "@vikram_daily" },
    { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", user: "@rahul_fits" },
    { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", user: "@danny_style" }
];



interface SectionProps {
    id: string;
    settings: {
        eyebrow?: string;
        title?: string;
        subtitle?: string;
        handle?: string;
        images?: InstaPost[];
        columns?: number;
        ctaText?: string;
        ctaLink?: string;
    }
}

export default function InstagramGridSection({ id, settings }: SectionProps) {
    const imagesToUse = (settings.images && settings.images.length > 0) ? settings.images : FALLBACK_POSTS;

    // Determine grid columns mapping
    const colClass = settings.columns === 6
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
        : settings.columns === 4
            ? 'grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8';

    return (
        <section id={id} className="bg-[#0B0B0D] pt-[100px] pb-[80px]">

            <div className="text-center mb-10 px-4">
                {settings.eyebrow && (
                    <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] block mb-3 font-bold">
                        {settings.eyebrow}
                    </span>
                )}
                {settings.title && (
                    <h2 className="font-playfair text-[36px] text-[#F5F5F7] mb-4">{settings.title}</h2>
                )}
                {settings.subtitle && (
                    <p className="font-inter text-[16px] text-[#A1A1AA] max-w-lg mx-auto">
                        {settings.subtitle}
                    </p>
                )}
            </div>

            {/* Grid */}
            <div className={`grid ${colClass} gap-[4px] w-full max-w-[1920px] mx-auto pb-12`}>
                {imagesToUse.map((post, idx) => (
                    <a
                        key={idx}
                        href={post.link || "https://instagram.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden block rounded-none"
                    >
                        <img
                            src={post.img}
                            alt="Instagram photo"
                            className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                        />
                        {/* Hover overlay with gradient from bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(198,167,94,0.35)] via-[rgba(198,167,94,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-4">
                            <Instagram size={28} className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-400 mb-2" />
                            <span className="absolute bottom-4 font-inter text-[12px] text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                                {post.user || settings.handle}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* CTAs */}
            {settings.ctaText && settings.ctaLink && (
                <div className="text-center flex gap-4 justify-center items-center px-4">
                    <a
                        href={settings.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-transparent border border-[#C6A75E] text-[#C6A75E] font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[32px] py-[12px] rounded hover:bg-[#C6A75E]/10 transition-colors"
                    >
                        {settings.ctaText}
                    </a>
                </div>
            )}

        </section>
    );
}
