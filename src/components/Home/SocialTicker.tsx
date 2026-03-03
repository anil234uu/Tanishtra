import React from 'react';

const TICKER_TEXT = "★★★★★ TRUSTED BY THOUSANDS ✦ PREMIUM QUALITY GUARANTEED ✦ ANTI-TARNISH FINISH ✦ HANDCRAFTED IN INDIA ✦ FAST PAN-INDIA SHIPPING ✦ COD AVAILABLE ✦ EASY RETURNS ✦ ";

export function SocialTicker() {
    return (
        <div className="h-[56px] bg-background-secondary border-y border-border flex items-center overflow-hidden">
            <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] w-max">
                <span className="font-montserrat text-[12px] uppercase text-text-secondary tracking-[2px] mx-4 inline-block">
                    {TICKER_TEXT}
                </span>
                <span className="font-montserrat text-[12px] uppercase text-text-secondary tracking-[2px] mx-4 inline-block">
                    {TICKER_TEXT}
                </span>
                <span className="font-montserrat text-[12px] uppercase text-text-secondary tracking-[2px] mx-4 inline-block">
                    {TICKER_TEXT}
                </span>
                <span className="font-montserrat text-[12px] uppercase text-text-secondary tracking-[2px] mx-4 inline-block">
                    {TICKER_TEXT}
                </span>
            </div>
        </div>
    );
}
