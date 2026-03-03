"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Diamond, Truck } from 'lucide-react';

export function TrustFeatures() {
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

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: <Shield size={48} strokeWidth={1.5} className="text-accent-gold mx-auto mb-4" />,
            title: "Premium Finishing",
            text: "Polished craftsmanship with long-lasting shine. Anti-tarnish coating on every piece."
        },
        {
            icon: <Diamond size={48} strokeWidth={1.5} className="text-accent-gold mx-auto mb-4" />,
            title: "Bold Designs",
            text: "Modern silhouettes inspired by power and presence. Stand out without trying."
        },
        {
            icon: <Truck size={48} strokeWidth={1.5} className="text-accent-gold mx-auto mb-4" />,
            title: "Pan-India Shipping",
            text: "Fast dispatch. Secure packaging. COD available across India."
        }
    ];

    return (
        <section ref={sectionRef} className="bg-background-secondary border-y border-border py-[80px] px-4 md:px-8">
            <div className="max-w-[1000px] mx-auto text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center transition-all duration-700 ease-out fill-mode-forwards ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {feature.icon}
                            <h3 className="font-inter text-[18px] font-bold text-text mb-2">
                                {feature.title}
                            </h3>
                            <p className="font-inter text-[14px] text-text-secondary leading-[1.6]">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
