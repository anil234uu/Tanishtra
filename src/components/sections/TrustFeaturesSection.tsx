"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Diamond, Truck, ShieldCheck, Gem } from 'lucide-react';

const iconMap: Record<string, any> = {
    'shield': Shield,
    'shield-check': ShieldCheck,
    'diamond': Diamond,
    'gem': Gem,
    'truck': Truck
};

interface TrustFeature {
    icon: string;
    title: string;
    description: string;
}

interface SectionProps {
    id: string;
    settings: {
        features: TrustFeature[];
        columns?: number;
        backgroundColor?: string;
    }
}

export default function TrustFeaturesSection({ id, settings }: SectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    const features = settings.features || [];
    if (features.length === 0) return null;

    // Determine grid columns mapping
    const gridColsOptions: Record<number, string> = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4'
    };
    const colClass = gridColsOptions[settings.columns || 3] || gridColsOptions[3];

    return (
        <section id={id} ref={sectionRef} className="border-y border-border py-[80px] px-4 md:px-8 bg-background-secondary" style={{ backgroundColor: settings.backgroundColor || '#121216' }}>
            <div className="max-w-[1000px] mx-auto text-center">
                <div className={`grid ${colClass} gap-8 md:gap-12`}>
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Shield;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center transition-all duration-700 ease-out fill-mode-forwards ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <IconComponent size={48} strokeWidth={1.5} className="text-accent-gold mx-auto mb-4" />
                                <h3 className="font-inter text-[18px] font-bold text-text mb-2">
                                    {feature.title}
                                </h3>
                                <p className="font-inter text-[14px] text-text-secondary leading-[1.6]">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
