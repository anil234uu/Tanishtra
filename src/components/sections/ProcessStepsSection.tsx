"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Pencil, Gem, Hammer, ShieldCheck, Icon as LucideIcon } from 'lucide-react';

const iconMap: Record<string, any> = {
    'pencil': Pencil,
    'gem': Gem,
    'hammer': Hammer,
    'shield-check': ShieldCheck,
    'shield': ShieldCheck
};

interface ProcessStep {
    number: string;
    icon: string;
    title: string;
    description: string;
}

interface SectionProps {
    id: string;
    settings: {
        eyebrow?: string;
        title?: string;
        subtitle?: string;
        steps: ProcessStep[];
        animateOnScroll?: boolean;
    }
}

export default function ProcessStepsSection({ id, settings }: SectionProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const isAnimated = settings.animateOnScroll !== false;
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id={id} ref={sectionRef} className="py-24 md:py-32 bg-[#0B0B0D] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
                <div className="text-center mb-20 md:mb-28">
                    {settings.eyebrow && (
                        <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] block mb-4 font-bold">
                            {settings.eyebrow}
                        </span>
                    )}
                    {settings.title && (
                        <h2 className="font-playfair text-[38px] md:text-[56px] text-[#F5F5F7] mb-6 leading-[1.1]">
                            {settings.title}
                        </h2>
                    )}
                    {settings.subtitle && (
                        <p className="font-inter text-[16px] md:text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                            {settings.subtitle}
                        </p>
                    )}
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-[#1F1F25] z-0">
                        {isAnimated ? (
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#C6A75E]/20 via-[#C6A75E] to-[#C6A75E]/20"
                                style={{
                                    scaleX: useTransform(scrollYProgress, [0.2, 0.6], [0, 1]),
                                    transformOrigin: "left"
                                }}
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-r from-[#C6A75E]/20 via-[#C6A75E] to-[#C6A75E]/20" />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 lg:gap-8 relative z-10">
                        {settings.steps && settings.steps.map((step, index) => {
                            const IconComponent = iconMap[step.icon] || Hammer;

                            const content = (
                                <div className="flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 bg-[#C6A75E] rounded-full flex items-center justify-center border-[6px] border-[#0B0B0D] group-hover:scale-110 transition-transform duration-500 z-20 mb-6">
                                        <IconComponent size={28} className="text-[#0B0B0D]" />
                                    </div>

                                    <div className="mt-2">
                                        <span className="font-bebas text-[28px] text-[#A1A1AA] group-hover:text-[#C6A75E] transition-colors duration-300 block mb-2 leading-none">
                                            {step.number}
                                        </span>
                                        <h3 className="font-inter text-[20px] font-bold text-[#F5F5F7] mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="font-inter text-[14px] text-[#6B6B73] leading-relaxed max-w-[280px]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );

                            if (isAnimated) {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.7, delay: index * 0.2 }}
                                    >
                                        {content}
                                    </motion.div>
                                );
                            }
                            return <div key={index}>{content}</div>;
                        })}
                    </div>
                </div>
            </div>

            {/* Background floating element */}
            <motion.div
                style={isAnimated ? { y, opacity } : {}}
                className="absolute top-1/4 right-[-10%] text-[10vw] md:text-[20vw] font-bebas text-[#1F1F25]/20 leading-none select-none z-0 pointer-events-none"
            >
                PROCESS
            </motion.div>
        </section>
    );
}
