import React from 'react';
import Link from 'next/link';

interface SectionProps {
    id: string;
    settings: {
        headline?: string;
        subtitle?: string;
        backgroundImage?: string;
        backgroundColor?: string;
        textColor?: string;
        ctaText?: string;
        ctaLink?: string;
        expiryDate?: string;
    }
}

export default function PromoBannerSection({ id, settings }: SectionProps) {
    const hasImage = !!settings.backgroundImage;

    return (
        <section
            id={id}
            className="relative py-[60px] md:py-[80px] px-4 flex items-center justify-center text-center overflow-hidden"
            style={{ backgroundColor: hasImage ? 'transparent' : (settings.backgroundColor || '#C6A75E') }}
        >
            {hasImage && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${settings.backgroundImage}')` }}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </>
            )}

            <div className="relative z-10 max-w-[800px] w-full mx-auto" style={{ color: settings.textColor || '#0B0B0D' }}>
                {settings.expiryDate && (
                    <span className="font-montserrat text-[12px] uppercase tracking-[3px] font-bold block mb-4 opacity-80 border border-current rounded-full px-4 py-1 inline-block">
                        Ends: {settings.expiryDate}
                    </span>
                )}

                {settings.headline && (
                    <h2 className="font-bebas text-[36px] md:text-[56px] tracking-[2px] leading-none mb-3">
                        {settings.headline}
                    </h2>
                )}

                {settings.subtitle && (
                    <p className="font-inter text-[16px] md:text-[18px] opacity-90 mb-8 max-w-[500px] mx-auto">
                        {settings.subtitle}
                    </p>
                )}

                {settings.ctaText && settings.ctaLink && (
                    <Link
                        href={settings.ctaLink}
                        className="inline-block px-[40px] py-[16px] font-montserrat text-[14px] uppercase font-bold tracking-[1px] rounded-[4px] transition-all"
                        style={{
                            backgroundColor: settings.textColor || '#0B0B0D',
                            color: settings.backgroundColor || '#C6A75E'
                        }}
                    >
                        {settings.ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
}
