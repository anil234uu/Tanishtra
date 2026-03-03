"use client";
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

        const variants = {
            primary: 'bg-accent-gold text-background hover:bg-accent-gold-light shadow-gold-glow',
            secondary: 'bg-background-secondary text-text hover:bg-white/10 border border-white/10',
            outline: 'bg-transparent border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-background',
            ghost: 'bg-transparent text-text hover:text-accent-gold'
        };

        const sizes = {
            sm: 'px-4 py-2 text-[10px]',
            md: 'px-6 py-3 text-[12px]',
            lg: 'px-8 py-4 text-[14px]'
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'font-montserrat uppercase tracking-[2px] font-semibold transition-colors duration-300',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = 'Button';
