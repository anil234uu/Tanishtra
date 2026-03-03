"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const FAQS = [
    {
        category: "Product & Quality",
        questions: [
            { q: "Will the chains tarnish?", a: "No. All Tanishtra chains are treated with a premium anti-tarnish coating. However, avoiding direct contact with harsh chemicals like perfumes will prolong their life." },
            { q: "Are your rings scratch-proof?", a: "Our Eternum Ceramic rings are highly scratch-resistant. Our silver/gold plated rings are durable but should be treated with care to avoid heavy impacts." },
            { q: "Can I wear them in the shower?", a: "While our pieces are water-resistant, we recommend removing them before showering or swimming to maintain their absolute best polish." }
        ]
    },
    {
        category: "Shipping & Returns",
        questions: [
            { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, COD is available pan-India for all orders." },
            { q: "How long does shipping take?", a: "Metropolitan areas generally receive orders in 2-4 days. Other regions take 4-7 days." },
            { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy. The item must be unused, in its original packaging, and with all tags attached." }
        ]
    }
];

export default function FAQPage() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-background min-h-screen pt-16 pb-24">
            <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-10">

                <div className="text-center mb-16">
                    <span className="font-montserrat text-[12px] uppercase tracking-[4px] text-accent-gold mb-4 block">SUPPORT</span>
                    <h1 className="font-bebas text-5xl md:text-6xl tracking-[4px] text-text mb-4">FREQUENTLY ASKED QUESTIONS</h1>
                    <p className="font-inter text-text-secondary">Find answers to common questions about our products, shipping, and returns.</p>
                </div>

                <div className="flex flex-col gap-12">
                    {FAQS.map((section, sIdx) => (
                        <div key={sIdx}>
                            <h2 className="font-playfair text-2xl text-text mb-6 pb-2 border-b border-border">{section.category}</h2>
                            <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-background-secondary">
                                {section.questions.map((faq, qIdx) => {
                                    const id = `${sIdx}-${qIdx}`;
                                    const isOpen = openId === id;
                                    return (
                                        <div key={qIdx} className="border-b border-border last:border-b-0">
                                            <button
                                                onClick={() => toggle(id)}
                                                className="w-full text-left p-5 md:p-6 flex items-center justify-between group hover:bg-background transition-colors"
                                            >
                                                <span className="font-inter font-bold text-[15px] text-text group-hover:text-accent-gold transition-colors pr-8 leading-snug">{faq.q}</span>
                                                <ChevronDown size={20} className={`text-text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out px-5 md:px-6 bg-background ${isOpen ? 'max-h-[300px] py-5 opacity-100 border-t border-border/50' : 'max-h-0 py-0 opacity-0'}`}>
                                                <p className="font-inter text-[14px] text-text-secondary leading-[1.7]">{faq.a}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center border border-border p-8 rounded-lg bg-background-secondary">
                    <h3 className="font-playfair text-xl text-text mb-2">Still need help?</h3>
                    <p className="font-inter text-text-secondary mb-6 text-sm">Our support team is ready to assist you.</p>
                    <Link href="/contact" className="inline-block bg-accent-gold text-background hover:bg-accent-gold-light transition-colors font-montserrat text-[13px] uppercase font-bold px-8 py-3 rounded">
                        Contact Us
                    </Link>
                </div>

            </div>
        </div>
    );
}
