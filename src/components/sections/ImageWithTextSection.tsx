import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SectionProps {
    id: string;
    settings: {
        image?: string;
        title?: string;
        body?: string;
        ctaText?: string;
        ctaLink?: string;
        imagePosition?: "left" | "right";
    }
}

export default function ImageWithTextSection({ id, settings }: SectionProps) {
    const isImageRight = settings.imagePosition === 'right';

    return (
        <section id={id} className="bg-background py-[80px] px-4 md:px-8">
            <div className={`max-w-[1320px] mx-auto flex flex-col ${isImageRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}>

                {/* Image Side */}
                <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden border border-border">
                        {settings.image ? (
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${settings.image}')` }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-background-secondary flex items-center justify-center">
                                <span className="text-text-muted font-inter">No image provided</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    {settings.title && (
                        <h2 className="font-playfair text-[32px] md:text-[48px] text-text mb-6 leading-tight whitespace-pre-line">
                            {settings.title}
                        </h2>
                    )}

                    {settings.body && (
                        <div className="font-inter text-[16px] text-text-secondary leading-[1.7] mb-8 whitespace-pre-line">
                            {settings.body}
                        </div>
                    )}

                    {settings.ctaText && settings.ctaLink && (
                        <Link
                            href={settings.ctaLink}
                            className="inline-flex items-center justify-center font-montserrat text-[14px] uppercase font-bold tracking-[1px] px-[36px] py-[16px] bg-accent-gold text-background hover:bg-accent-gold-light transition-colors rounded-[4px]"
                        >
                            {settings.ctaText}
                        </Link>
                    )}
                </div>

            </div>
        </section>
    );
}
