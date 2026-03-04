import React from 'react';
import Link from 'next/link';

interface CategoryItem {
    name: string;
    image: string;
    link: string;
    productCount: string;
}

interface SectionProps {
    id: string;
    settings: {
        eyebrow: string;
        title: string;
        subtitle: string;
        categories: CategoryItem[];
    };
}

export default function CategoryGridSection({ id, settings }: SectionProps) {
    const categories = settings.categories || [];

    if (categories.length === 0) return null;

    return (
        <section id={id} className="bg-background pt-[80px] pb-[60px] px-4 md:px-8">
            <div className="max-w-[1320px] mx-auto">
                <div className="text-center mb-12">
                    {settings.eyebrow && (
                        <span className="font-montserrat text-[12px] uppercase text-accent-gold tracking-[2px] block mb-2">
                            {settings.eyebrow}
                        </span>
                    )}
                    {settings.title && (
                        <h2 className="font-bebas text-4xl md:text-[42px] tracking-[4px] text-text mb-2">
                            {settings.title}
                        </h2>
                    )}
                    {settings.subtitle && (
                        <p className="font-inter text-[16px] text-text-secondary">
                            {settings.subtitle}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <Link
                            href={category.link}
                            key={index}
                            className={`group relative rounded-lg overflow-hidden border border-border transition-all duration-400 ease-in-out hover:-translate-y-1 block aspect-[3/4] ${index === 4 ? 'col-span-2 md:col-span-1 mx-auto w-1/2 md:w-full' : ''
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-400 ease-in-out group-hover:scale-105"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/30 to-[#0B0B0D]/10 pointer-events-none" />

                            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col pointer-events-none border-b-[3px] border-transparent group-hover:border-accent-gold transition-colors duration-400">
                                <h3 className="font-bebas text-[24px] text-white tracking-[2px] leading-none mb-1">
                                    {category.name}
                                </h3>
                                <span className="font-montserrat text-[11px] text-[#6B6B73] uppercase mb-1">
                                    {category.productCount}
                                </span>

                                <span className="font-montserrat text-[11px] text-accent-gold uppercase tracking-[1px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-in-out">
                                    EXPLORE &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
