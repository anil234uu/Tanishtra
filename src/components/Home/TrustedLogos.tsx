import React from 'react';

export function TrustedLogos() {
    return (
        <section className="bg-[#0B0B0D] py-[40px] border-b border-[#1F1F25]">
            <div className="max-w-[1400px] mx-auto px-4 text-center">
                <span className="font-montserrat text-[11px] uppercase text-[#6B6B73] tracking-[3px] block mb-[24px]">
                    TRUSTED & FEATURED
                </span>

                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-[48px]">
                    {[
                        "INSTAGRAM FEATURED",
                        "PREMIUM QUALITY ★",
                        "10,000+ HAPPY CUSTOMERS",
                        "ANTI-TARNISH CERTIFIED",
                        "MADE IN INDIA",
                    ].map((text, idx) => (
                        <div
                            key={idx}
                            className="border border-[#2A2A2F] px-[20px] py-[8px] rounded-[20px] bg-transparent font-montserrat text-[11px] uppercase text-[#6B6B73] whitespace-nowrap"
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
