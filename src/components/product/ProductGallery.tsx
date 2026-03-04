"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, Play, Pause, VolumeX, Volume2 } from 'lucide-react';

interface ProductGalleryProps {
    images: {
        primary: string;
        gallery: string[];
        video?: string;
    };
    productName: string;
    badge?: string;
}

export function ProductGallery({ images, productName, badge }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Desktop Zoom State
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    // Video State
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // Combine all media items into one array (Video first, then gallery)
    const mediaItems = images.video
        ? [{ type: 'video', url: images.video }, ...images.gallery.map(url => ({ type: 'image', url }))]
        : images.gallery.map(url => ({ type: 'image', url }));

    const activeMedia = mediaItems[activeIndex];

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle Keyboard Events for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;
            if (e.key === 'Escape') setIsLightboxOpen(false);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, activeIndex]);

    // Handle Video Playback when Slide Changes
    useEffect(() => {
        if (activeMedia?.type === 'video' && videoRef.current) {
            // Wait for video to be ready then play
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => setIsPlaying(true)).catch(error => console.log('Autoplay prevented', error));
            }
        } else {
            setIsPlaying(false);
        }
    }, [activeIndex, activeMedia]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
    }, [mediaItems.length]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
    }, [mediaItems.length]);

    // Desktop Hover Zoom Logic
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || activeMedia.type === 'video') return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPos({ x, y });
        setIsZooming(true);
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
    };

    const toggleVideoPlayback = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent opening lightbox
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    // Mobile Swipe Handling
    const carouselRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        if (!carouselRef.current || !isMobile) return;
        const scrollPosition = carouselRef.current.scrollLeft;
        const index = Math.round(scrollPosition / window.innerWidth);
        if (index !== activeIndex && index >= 0 && index < mediaItems.length) {
            setActiveIndex(index);
        }
    };

    return (
        <div className="w-full relative select-none">

            {/* 1. MAIN DISPLAY AREA */}
            <div className={`relative w-full ${isMobile ? 'h-[100vw] rounded-none' : 'aspect-square rounded-lg max-h-[800px]'} bg-[#0F0F12] overflow-hidden group border border-[#1F1F25] md:mb-3`}>

                {/* Mobile Carousel Wrapper */}
                {isMobile ? (
                    <div
                        ref={carouselRef}
                        onScroll={handleScroll}
                        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {mediaItems.map((item, idx) => (
                            <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative" onClick={() => setIsLightboxOpen(true)}>
                                {item.type === 'video' ? (
                                    <video
                                        ref={idx === activeIndex ? videoRef : null}
                                        src={item.url}
                                        className="w-full h-full object-contain pointer-events-none"
                                        loop
                                        muted={isMuted}
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={`${productName} image ${idx + 1}`}
                                        className="w-full h-full object-contain pointer-events-none"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Desktop Main Display */
                    <div
                        className={`w-full h-full relative ${activeMedia.type === 'image' ? (isZooming ? 'cursor-zoom-out' : 'cursor-zoom-in') : ''}`}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => activeMedia.type === 'image' ? setIsLightboxOpen(true) : null}
                    >
                        {activeMedia.type === 'video' ? (
                            <div className="w-full h-full relative">
                                <video
                                    ref={videoRef}
                                    src={activeMedia.url}
                                    className="w-full h-full object-contain"
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    onClick={(e) => { e.stopPropagation(); toggleVideoPlayback(e); }}
                                />
                                {/* Video Controls Overlay */}
                                <button
                                    onClick={toggleVideoPlayback}
                                    className="absolute inset-0 m-auto w-14 h-14 bg-[#0B0B0D]/70 hover:bg-accent-gold/30 rounded-full flex items-center justify-center transition-colors border border-border/50 backdrop-blur-sm z-10"
                                >
                                    {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
                                </button>
                                <button
                                    onClick={toggleMute}
                                    className="absolute bottom-4 right-4 w-10 h-10 bg-[#0B0B0D]/70 hover:bg-accent-gold/30 rounded-full flex items-center justify-center transition-colors border border-border/50 backdrop-blur-sm z-10"
                                >
                                    {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Standard Image */}
                                <img
                                    src={activeMedia.url}
                                    alt={productName}
                                    className={`w-full h-full object-contain transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
                                />

                                {/* Zoom Lens Overlay */}
                                {isZooming && (
                                    <div
                                        className="absolute inset-0 bg-no-repeat pointer-events-none"
                                        style={{
                                            backgroundImage: `url(${activeMedia.url})`,
                                            backgroundSize: '250%', // 2.5x Zoom
                                            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                        }}
                                    />
                                )}

                                {/* Zoom Hint */}
                                {!isZooming && (
                                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 flex items-center gap-2 rounded-full border border-border pointer-events-none opacity-60">
                                        <Maximize2 size={12} className="text-text-secondary" />
                                        <span className="text-[11px] font-inter text-text-secondary">Hover to zoom</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Expand Icon */}
                        <button
                            className="absolute top-3 right-3 w-9 h-9 bg-[#0B0B0D]/60 hover:bg-accent-gold/20 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-transparent hover:border-accent-gold/50 z-20 group"
                            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(true); }}
                        >
                            <Maximize2 size={16} className="text-text-muted group-hover:text-accent-gold" />
                        </button>
                    </div>
                )}

                {/* Badge Overlay */}
                {badge && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="font-bebas text-[14px] bg-accent-gold text-[#0B0B0D] px-[8px] py-[2px] tracking-[1px] shadow-lg">
                            {badge}
                        </span>
                    </div>
                )}

                {/* Mobile Counter */}
                {isMobile && (
                    <div className="absolute top-4 right-4 bg-[#0B0B0D]/60 backdrop-blur-md px-3 py-1 rounded-full border border-border z-20 text-[11px] font-montserrat tracking-[1px] text-text-muted">
                        {activeIndex + 1} / {mediaItems.length}
                    </div>
                )}

                {/* Mobile Dot Indicators */}
                {isMobile && mediaItems.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-1.5 z-20">
                        {mediaItems.slice(0, 6).map((_, idx) => (
                            <div
                                key={idx}
                                className={`rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-[18px] h-[6px] bg-accent-gold' : 'w-[6px] h-[6px] bg-[#2A2A2F] opacity-70'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 2. DESKTOP THUMBNAIL STRIP */}
            {!isMobile && mediaItems.length > 1 && (
                <div className="w-full flex items-center gap-3 overflow-x-auto py-1 scrollbar-hide px-1">
                    {mediaItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative flex-shrink-0 w-[80px] h-[80px] rounded-md overflow-hidden bg-[#0F0F12] transition-all duration-200 border-2 ${idx === activeIndex ? 'border-accent-gold shadow-[0_0_0_1px_rgba(198,167,94,0.5)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-border'}`}
                        >
                            {item.type === 'video' ? (
                                <>
                                    <img src={item.url} alt="Video Thumbnail Fallback" className="w-full h-full object-cover blur-[2px]" />
                                    <div className="absolute inset-0 m-auto w-6 h-6 flex items-center justify-center">
                                        <Play size={18} className="text-white drop-shadow-md" fill="white" />
                                    </div>
                                </>
                            ) : (
                                <img src={item.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* 3. FULLSCREEN LIGHTBOX */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[9999] bg-[#0B0B0D]/95 backdrop-blur-xl flex flex-col items-center justify-center">

                    {/* Header Controls */}
                    <div className="absolute top-0 w-full p-4 flex justify-between items-center z-50">
                        <div className="font-montserrat text-[13px] tracking-[2px] text-text-muted uppercase">
                            {activeIndex + 1} / {mediaItems.length}
                        </div>
                        <button
                            className="w-12 h-12 flex items-center justify-center text-text hover:text-accent-gold transition-colors bg-background/50 rounded-full border border-border"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Left/Right Arrows */}
                    <button
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-text hover:text-accent-gold transition-colors bg-background/50 rounded-full border border-border z-50 hidden md:flex"
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-text hover:text-accent-gold transition-colors bg-background/50 rounded-full border border-border z-50 hidden md:flex"
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Main Lightbox Content */}
                    <div className="w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center relative select-none">
                        {mediaItems[activeIndex].type === 'video' ? (
                            <video
                                src={mediaItems[activeIndex].url}
                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                controls
                                autoPlay
                            />
                        ) : (
                            <img
                                src={mediaItems[activeIndex].url}
                                alt={productName}
                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                style={{
                                    /* Handle pinch to zoom natively via CSS touch action */
                                    touchAction: 'pan-x pan-y pinch-zoom'
                                }}
                            />
                        )}
                    </div>

                    {/* Lightbox Thumbnails (Desktop Only) */}
                    <div className="absolute bottom-6 w-full flex justify-center gap-2 px-4 overflow-x-auto scrollbar-hide">
                        {mediaItems.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-14 h-14 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${idx === activeIndex ? 'border-accent-gold' : 'border-transparent opacity-50 hover:opacity-100'}`}
                            >
                                {item.type === 'video' ? (
                                    <div className="w-full h-full bg-[#1F1F25] flex items-center justify-center">
                                        <Play size={16} className="text-white" fill="white" />
                                    </div>
                                ) : (
                                    <img src={item.url} className="w-full h-full object-cover" />
                                )}
                            </button>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}
