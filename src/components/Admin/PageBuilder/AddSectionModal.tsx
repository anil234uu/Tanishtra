"use client";
import React from 'react';
import { LayoutGrid, Image, Megaphone, Star, Shield, PlayCircle, AlignLeft, Link, List } from 'lucide-react';

const availableSections = [
    { type: 'hero', name: 'Hero Banner', desc: 'Main cinematic banner', icon: Image },
    { type: 'productShowcase', name: 'Product Showcase', desc: 'Grid of products (bestsellers/new)', icon: LayoutGrid },
    { type: 'collectionBanner', name: 'Collection Banner', desc: 'Promote specific collections', icon: Image },
    { type: 'promoBanner', name: 'Promo Banner', desc: 'Timed sales or offers', icon: Megaphone },
    { type: 'testimonialSlider', name: 'Testimonials', desc: 'Rotating customer reviews', icon: Star },
    { type: 'trustFeatures', name: 'Trust Features', desc: 'Shipping, returns, warranty', icon: Shield },
    { type: 'processSteps', name: 'Process Steps', desc: 'Manufacturing timeline', icon: List },
    { type: 'editorialBanner', name: 'Editorial Banner', desc: 'Storytelling text with image', icon: Image },
    { type: 'instagramGrid', name: 'Instagram Grid', desc: 'UGC social photo grid', icon: LayoutGrid },
    { type: 'categoryGrid', name: 'Category Grid', desc: 'Visual links to main categories', icon: LayoutGrid },
    { type: 'socialProofTicker', name: 'Social Proof Ticker', desc: 'Scrolling bar of mini-reviews', icon: Megaphone },
    { type: 'richText', name: 'Rich Text', desc: 'Standard formatted text block', icon: AlignLeft },
    { type: 'imageWithText', name: 'Image + Text', desc: 'Split layout feature', icon: Image },
    { type: 'video', name: 'Video Block', desc: 'Autoplaying or manual videos', icon: PlayCircle },
    { type: 'newsletter', name: 'Newsletter', desc: 'Email capture form', icon: Megaphone },
];

interface AddSectionModalProps {
    onClose: () => void;
    onAdd: (type: string) => void;
}

export default function AddSectionModal({ onClose, onAdd }: AddSectionModalProps) {
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#16161B] border border-[#1F1F25] rounded-xl w-full max-w-[800px] max-h-[85vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="p-6 border-b border-[#1F1F25]">
                    <h2 className="font-playfair text-[24px] text-[#F5F5F7] mb-1">Add Section</h2>
                    <p className="font-inter text-[14px] text-[#A1A1AA]">Choose a component to insert at the bottom of the page</p>
                </div>

                <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableSections.map(sec => {
                        const Icon = sec.icon;
                        return (
                            <button
                                key={sec.type}
                                onClick={() => onAdd(sec.type)}
                                className="bg-[#121216] border border-[#1F1F25] rounded-lg p-5 text-center cursor-pointer group hover:border-[#C6A75E] transition-all hover:bg-[rgba(198,167,94,0.05)] text-left flex flex-col items-center justify-center min-h-[140px]"
                            >
                                <Icon size={32} strokeWidth={1.5} className="text-[#A1A1AA] group-hover:text-[#C6A75E] mb-3 transition-colors" />
                                <h3 className="font-inter text-[13px] font-bold text-[#F5F5F7] mb-1">{sec.name}</h3>
                                <p className="font-inter text-[11px] text-[#6B6B73] leading-tight text-center">{sec.desc}</p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
