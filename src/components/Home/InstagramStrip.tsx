import React from 'react';
import { Instagram } from 'lucide-react';

const INSTA_POSTS = [
    { img: "https://images.unsplash.com/photo-1599643478514-46b1981da96e?auto=format&fit=crop&q=80&w=400", user: "@varun_style" },
    { img: "https://images.unsplash.com/photo-1611591437158-7c858b29ec17?auto=format&fit=crop&q=80&w=400", user: "@arjunsingh" },
    { img: "https://images.unsplash.com/photo-1573408301145-b98c46544ea0?auto=format&fit=crop&q=80&w=400", user: "@thekaran" },
    { img: "https://images.unsplash.com/photo-1605100804763-247f6612148e?auto=format&fit=crop&q=80&w=400", user: "@rohit_menswear" },
    { img: "https://images.unsplash.com/photo-1629814434298-6ce0af31a980?auto=format&fit=crop&q=80&w=400", user: "@suresh_k" },
    { img: "https://images.unsplash.com/photo-1617331566373-d1ea2cb5dc2f?auto=format&fit=crop&q=80&w=400", user: "@vikram_daily" },
    { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", user: "@rahul_fits" },
    { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", user: "@danny_style" }
];

export function InstagramStrip() {
    return (
        <section className="bg-[#0B0B0D] pt-[100px] pb-[80px]">

            <div className="text-center mb-10 px-4">
                <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] block mb-3 font-bold">
                    COMMUNITY
                </span>
                <h2 className="font-playfair text-[36px] text-[#F5F5F7] mb-4">#TanishtraMen</h2>
                <p className="font-inter text-[16px] text-[#A1A1AA] max-w-lg mx-auto">
                    Real customers. Real style. Tag us to get featured.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[4px] w-full max-w-[1920px] mx-auto pb-12">
                {INSTA_POSTS.map((post, idx) => (
                    <a
                        key={idx}
                        href="https://instagram.com"
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
                                {post.user}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* CTAs */}
            <div className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-transparent border border-[#C6A75E] text-[#C6A75E] font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[32px] py-[12px] rounded hover:bg-[#C6A75E]/10 transition-colors w-full sm:w-auto"
                >
                    FOLLOW @TANISHTRA
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-transparent text-[#A1A1AA] font-montserrat text-[13px] uppercase tracking-[1px] font-bold px-[32px] py-[12px] hover:text-[#C6A75E] transition-colors w-full sm:w-auto"
                >
                    SHARE YOUR LOOK
                </a>
            </div>

        </section>
    );
}
