"use client";
import { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale' | 'stagger';

interface ScrollAnimationOptions {
    type?: AnimationType;
    threshold?: number;
    delay?: number; // Base delay in ms
    staggerDelay?: number; // Delay between children in ms for stagger type
    duration?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: ScrollAnimationOptions = {}) {
    const {
        type = 'fade-up',
        threshold = 0.2,
        delay = 0,
        staggerDelay = 80,
        duration = 700
    } = options;

    const elementRef = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Respect prefers-reduced-motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Determine if element is visible based on threshold
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Unobserve after it becomes visible once
                    if (elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the viewport edge
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold]);

    // Return the stable styles instead of computing classes for better cross-framework compatibility
    const getStyles = () => {
        if (!isVisible) {
            switch (type) {
                case 'fade-up':
                    return { opacity: 0, transform: 'translateY(30px)' };
                case 'fade-in':
                    return { opacity: 0 };
                case 'slide-left':
                    return { opacity: 0, transform: 'translateX(-40px)' };
                case 'slide-right':
                    return { opacity: 0, transform: 'translateX(40px)' };
                case 'scale':
                    return { opacity: 0, transform: 'scale(0.92)' };
                case 'stagger': // Handled via specific mapped children usually, but sets base invisible state
                    return { opacity: 0, transform: 'translateY(30px)' };
                default:
                    return { opacity: 0 };
            }
        }

        // Visible State
        const baseTransition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
        const easeTransition = `all 800ms ease ${delay}ms`; // specifically for fade-in

        switch (type) {
            case 'fade-up':
                return { opacity: 1, transform: 'translateY(0)', transition: baseTransition };
            case 'fade-in':
                return { opacity: 1, transition: easeTransition };
            case 'slide-left':
                return { opacity: 1, transform: 'translateX(0)', transition: baseTransition };
            case 'slide-right':
                return { opacity: 1, transform: 'translateX(0)', transition: baseTransition };
            case 'scale':
                return { opacity: 1, transform: 'scale(1)', transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` };
            case 'stagger':
                // Return just the transition rule for the parent wrapper,
                // The actual mapping component will inject the index * staggerDelay
                return { opacity: 1, transform: 'translateY(0)', transition: baseTransition };
            default:
                return { opacity: 1, transition: baseTransition };
        }
    };

    return {
        ref: elementRef,
        isVisible,
        styles: getStyles()
    };
}
