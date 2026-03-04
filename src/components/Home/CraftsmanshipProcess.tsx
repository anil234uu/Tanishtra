"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hammer, Sparkles, ShieldCheck, Gem } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "The Design Crucible",
        description: "Every piece begins as a bold concept in our Mumbai studio, inspired by modern architecture and ancient symbolism.",
        icon: <Hammer size={24} className="text-[#0B0B0D]" />,
        image: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Precision Forging",
        description: "We utilize aerospace-grade 316L Stainless Steel and pure Titanium for an unbreakable foundation.",
        icon: <Gem size={24} className="text-[#0B0B0D]" />,
        image: "https://images.unsplash.com/photo-1542484666-6eb1eb1580aa?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "PVD Coating",
        description: "Physical Vapor Deposition bonds our 18k gold and matte black finishes at a molecular level so they never fade.",
        icon: <Sparkles size={24} className="text-[#0B0B0D]" />,
        image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Quality Mastery",
        description: "Each item undergoes our rigorous 4-stage inspection before being engraved with the Tanishtra seal.",
        icon: <ShieldCheck size={24} className="text-[#0B0B0D]" />,
        image: "https://images.unsplash.com/photo-1599643478514-46b1981da96e?auto=format&fit=crop&w=600&q=80" // Placeholder
    }
];

export function CraftsmanshipProcess() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#0B0B0D] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
                <div className="text-center mb-20 md:mb-28">
                    <span className="font-montserrat text-[12px] uppercase text-[#C6A75E] tracking-[3px] block mb-4 font-bold">
                        THE ART OF CREATION
                    </span>
                    <h2 className="font-playfair text-[38px] md:text-[56px] text-[#F5F5F7] mb-6 leading-[1.1]">
                        Uncompromising Craftsmanship
                    </h2>
                    <p className="font-inter text-[16px] md:text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                        We don't just make jewelry. We engineer modern armor. Discover the meticulous four-step process behind every Tanishtra piece.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[120px] left-[10%] right-[10%] h-[1px] bg-[#1F1F25] z-0">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#C6A75E]/20 via-[#C6A75E] to-[#C6A75E]/20"
                            style={{
                                scaleX: useTransform(scrollYProgress, [0.2, 0.6], [0, 1]),
                                transformOrigin: "left"
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 lg:gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-full aspect-[4/5] rounded-lg overflow-hidden mb-8 relative border border-[#1F1F25] group-hover:border-[#C6A75E]/30 transition-colors duration-500">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-60"></div>

                                    {/* Circular Icon overlapping image */}
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#C6A75E] rounded-full flex items-center justify-center border-[6px] border-[#0B0B0D] group-hover:scale-110 transition-transform duration-500 z-20">
                                        {step.icon}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4">
                                    <span className="font-bebas text-[28px] text-[#A1A1AA] group-hover:text-[#C6A75E] transition-colors duration-300 block mb-2 leading-none">
                                        0{step.id}
                                    </span>
                                    <h3 className="font-inter text-[20px] font-bold text-[#F5F5F7] mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="font-inter text-[14px] text-[#6B6B73] leading-relaxed max-w-[280px]">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background floating element */}
            <motion.div
                style={{ y, opacity }}
                className="absolute top-1/4 right-[-10%] text-[20vw] font-bebas text-[#1F1F25]/20 leading-none select-none z-0 pointer-events-none"
            >
                PROCESS
            </motion.div>
        </section>
    );
}
