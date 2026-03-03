"use client";
import React, { useState } from 'react';

export function NewsletterCapture() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Typically we'd send to API here
            setIsSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section className="bg-background-secondary py-[80px] px-4 md:px-8 border-t border-accent-gold/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-accent-gold"></div>

            <div className="max-w-[520px] mx-auto text-center">
                {!isSubmitted ? (
                    <>
                        <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[2px] block mb-4">
                            INNER CIRCLE
                        </span>
                        <h2 className="font-playfair text-[24px] md:text-[36px] text-text mb-3 leading-tight">
                            Get 10% Off Your First Order
                        </h2>
                        <p className="font-inter text-[16px] text-text-secondary mb-7">
                            Plus early access to new drops, exclusive offers, and style tips.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-2 mb-3 relative">
                            {/* Honeypot field */}
                            <input type="text" name="b_name" className="hidden" tabIndex={-1} autoComplete="off" />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 h-[48px] bg-background border border-[#2A2A2F] rounded-[4px] px-4 text-text placeholder:text-[#6B6B73] focus:outline-none focus:border-accent-gold transition-colors font-inter text-[15px]"
                            />
                            <button
                                type="submit"
                                className="h-[48px] bg-accent-gold text-background font-montserrat text-[14px] uppercase font-bold rounded-[4px] px-[28px] hover:bg-accent-gold-hover hover:-translate-y-[2px] transition-all"
                            >
                                JOIN NOW
                            </button>
                        </form>
                        <p className="font-inter text-[12px] text-[#6B6B73]">
                            No spam. Unsubscribe anytime.
                        </p>
                    </>
                ) : (
                    <div className="py-8 animate-in fade-in zoom-in duration-500">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-system-success/20 text-system-success mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <h2 className="font-inter text-[16px] text-accent-gold font-bold mb-2">
                            Welcome to the Inner Circle! Check your inbox.
                        </h2>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-[#6B6B73] text-[13px] underline mt-4 hover:text-text transition-colors"
                        >
                            Sign up another email
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
