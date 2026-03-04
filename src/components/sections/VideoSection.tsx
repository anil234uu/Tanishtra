"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface SectionProps {
    id: string;
    settings: {
        videoUrl?: string;
        title?: string;
        subtitle?: string;
        autoplay?: boolean;
    }
}

export default function VideoSection({ id, settings }: SectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(settings.autoplay || false);

    useEffect(() => {
        if (settings.autoplay && videoRef.current) {
            videoRef.current.play().catch(e => {
                console.warn("Autoplay blocked by browser policy:", e);
                setIsPlaying(false);
            });
        }
    }, [settings.autoplay]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section id={id} className="bg-background py-[80px] px-4 md:px-8">
            <div className="max-w-[1320px] mx-auto">
                <div className="text-center mb-10">
                    {settings.title && (
                        <h2 className="font-playfair text-[32px] md:text-[40px] text-text mb-3 leading-tight">
                            {settings.title}
                        </h2>
                    )}
                    {settings.subtitle && (
                        <p className="font-inter text-[16px] text-text-secondary">
                            {settings.subtitle}
                        </p>
                    )}
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-background-secondary group cursor-pointer" onClick={togglePlay}>
                    {settings.videoUrl ? (
                        <video
                            ref={videoRef}
                            src={settings.videoUrl}
                            className="w-full h-full object-cover"
                            loop
                            muted={settings.autoplay}
                            playsInline
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-text-muted font-inter">No video URL provided</span>
                        </div>
                    )}

                    {(!isPlaying || !settings.autoplay) && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                            <button
                                className="w-20 h-20 bg-accent-gold/90 rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform"
                                aria-label="Play Video"
                            >
                                <Play size={32} fill="currentColor" className="ml-2" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
