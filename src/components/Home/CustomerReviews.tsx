import React from 'react';

export function CustomerReviews() {
    const reviews = [
        {
            name: "Varun",
            date: "27 Feb 2026",
            text: "This chain offers a good balance of style and comfort...",
            product: "Cuban Chain For Men (Black)"
        },
        {
            name: "Suresh",
            date: "26 Feb 2026",
            text: "The look is clean and modern...",
            product: "Eternum Ceramic Ring For Men"
        },
        {
            name: "Aditya",
            date: "14 Feb 2026",
            text: "I've bought accessories from 10 different brands online. Tanishtra is the only one where the product looks BETTER than the photos.",
            product: "Lava, Rudraksha And Blue Turquoise Bracelet"
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
                <span className="font-montserrat text-[11px] text-accent-gold uppercase tracking-[2px] block mb-2">Real Customers</span>
                <h2 className="font-bebas text-5xl tracking-widest text-text mb-16">WHAT THEY'RE SAYING</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-background-secondary border border-border p-8 text-left flex flex-col hover:border-accent-gold transition-colors duration-500">
                            <div className="flex gap-1 text-accent-gold text-[14px] mb-6">
                                {"★★★★★"}
                            </div>
                            <p className="font-inter text-text-muted italic leading-relaxed mb-8 flex-1">"{review.text}"</p>
                            <div className="border-t border-border pt-6">
                                <p className="font-inter font-bold text-text text-sm">{review.name}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-inter text-text-muted text-xs">{review.date}</p>
                                    <span className="font-montserrat text-[9px] uppercase tracking-[1px] text-accent-gold">{review.product}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
