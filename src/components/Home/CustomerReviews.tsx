"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Counter component for the stats
function AnimatedCounter({ end, duration = 2 }: { end: number, duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const increment = end / (duration * 60); // 60fps
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [end, duration, isInView]);

    return <span ref={ref}>{count}{end > count ? '' : count === 4 ? '.8' : count > 90 ? '%' : '+'}</span>;
}

export function CustomerReviews() {
    const [showAll, setShowAll] = useState(false);

    const reviews = [
        {
            name: "Varun S.",
            location: "Mumbai",
            text: "This chain offers a good balance of style and comfort. The finish feels premium for the price. Wearing it daily for 3 months now and the anti-tarnish coating actually works. Getting compliments everywhere I go.",
            product: "Cuban Chain For Men (Black)"
        },
        {
            name: "Suresh K.",
            location: "Delhi",
            text: "The look is clean and modern. Exactly what I wanted — something bold but not over the top. Quality exceeded my expectations. My friends asked me which international brand this is from. That says everything.",
            product: "Snake Chain For Men (Silver)"
        },
        {
            name: "Arjun M.",
            location: "Bangalore",
            text: "Ordered the bracelet on a whim. Packaging was impressive — felt like unboxing something expensive. Product was even better. Already eyeing the chain collection. Tanishtra has a customer for life.",
            product: "Lava Rudraksha Bracelet"
        },
        {
            name: "Karan D.",
            location: "Pune",
            text: "The TitanCore ring is genuinely the best ring I've owned in this price range. The weight feels substantial, the finish is flawless. Wore it to a wedding and everyone noticed. Already ordered the Eternum next.",
            product: "TitanCore Ring For Men (Silver)"
        },
        {
            name: "Rohit P.",
            location: "Hyderabad",
            text: "I've been burned by online accessory brands before — cheap metal that turns green in a week. Tanishtra is different. 4 months of daily wear on my kada and it still looks brand new. Respect.",
            product: "Titanium Steel Kada"
        }
    ];

    const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

    return (
        <section className="py-24 bg-[#0B0B0D]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] block mb-3 font-bold">
                        REAL STORIES
                    </span>
                    <h2 className="font-playfair text-[42px] text-[#F5F5F7] mb-4">What Our Customers Say</h2>
                    <p className="font-inter text-[16px] text-[#A1A1AA] max-w-lg mx-auto">
                        Join 10,000+ men who upgraded their accessory game
                    </p>
                </div>

                {/* Aggregate Rating Bar */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[48px] mb-16 px-4 py-8 border border-[#1F1F25] rounded-xl bg-[#121216] max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="font-bebas text-[48px] text-[#C6A75E] leading-none mb-1"><AnimatedCounter end={4} /></div>
                        <div className="text-[#C6A75E] text-[18px] mb-1">★★★★★</div>
                        <div className="font-inter text-[13px] text-[#6B6B73]">out of 5</div>
                    </div>
                    <div className="hidden md:block w-[1px] h-[50px] bg-[#2A2A2F]"></div>
                    <div className="flex flex-col items-center">
                        <div className="font-bebas text-[36px] text-[#F5F5F7] leading-none mb-2"><AnimatedCounter end={500} /></div>
                        <div className="font-inter text-[13px] text-[#A1A1AA]">5-Star Reviews</div>
                    </div>
                    <div className="hidden md:block w-[1px] h-[50px] bg-[#2A2A2F]"></div>
                    <div className="flex flex-col items-center">
                        <div className="font-bebas text-[36px] text-[#F5F5F7] leading-none mb-2"><AnimatedCounter end={10000} /></div>
                        <div className="font-inter text-[13px] text-[#A1A1AA]">Happy Customers</div>
                    </div>
                    <div className="hidden md:block w-[1px] h-[50px] bg-[#2A2A2F]"></div>
                    <div className="flex flex-col items-center">
                        <div className="font-bebas text-[36px] text-[#F5F5F7] leading-none mb-2"><AnimatedCounter end={98} /></div>
                        <div className="font-inter text-[13px] text-[#A1A1AA]">Would Recommend</div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visibleReviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4, boxShadow: '0 0 15px rgba(198, 167, 94, 0.2)' }}
                            className="bg-[#16161B] border border-[#1F1F25] p-[32px] rounded-[12px] text-left flex flex-col relative transition-all duration-300 hover:border-[#C6A75E]/50"
                        >
                            <span className="absolute top-[16px] left-[20px] font-playfair text-[48px] text-[#C6A75E]/20 leading-none select-none">"</span>

                            <div className="flex text-[#C6A75E] text-[16px] mb-4 z-10 relative">
                                ★★★★★
                            </div>

                            <p className="font-inter text-[#F5F5F7] text-[15px] italic leading-[1.7] mb-5 flex-1 z-10 relative">
                                "{review.text}"
                            </p>

                            <div className="w-full h-[1px] bg-[#2A2A2F] my-4"></div>

                            <div className="flex flex-col w-full z-10 relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-inter font-bold text-[#F5F5F7] text-[14px]">{review.name}</p>
                                        <p className="font-inter text-[#6B6B73] text-[12px]">{review.location}</p>
                                    </div>
                                    <span className="font-montserrat text-[10px] text-[#4A7C59] font-bold">✓ Verified Purchase</span>
                                </div>
                                <p className="font-inter text-[#C6A75E] text-[12px] mt-1">Purchased: {review.product}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Show More Button */}
                {!showAll && reviews.length > 3 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(true)}
                            className="bg-transparent border border-[#C6A75E] text-[#C6A75E] font-montserrat text-[13px] uppercase font-bold tracking-[1px] px-[32px] py-[12px] rounded cursor-pointer hover:bg-[#C6A75E]/10 transition-colors"
                        >
                            Show More Reviews
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
