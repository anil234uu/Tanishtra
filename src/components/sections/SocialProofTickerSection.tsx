import React from 'react';

interface SectionProps {
    id: string;
    settings: {
        items: string[];
        separator: string;
        speed: string;
    };
}

export default function SocialProofTickerSection({ id, settings }: SectionProps) {
    const items = settings.items || [];
    const TICKER_TEXT = items.join(` ${settings.separator || '✦'} `) + ` ${settings.separator || '✦'} `;

    return (
        <div id={id} className="h-[56px] bg-background-secondary border-y border-border flex items-center overflow-hidden">
            <div className={`flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] w-max ${settings.speed === 'fast' ? 'animation-duration-[15s]' : settings.speed === 'slow' ? 'animation-duration-[40s]' : ''}`}>
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
