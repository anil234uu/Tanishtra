import React from 'react';

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col group animate-pulse">
            {/* Image Placeholder */}
            <div className="relative w-full aspect-[4/5] bg-[#16161B] rounded-lg overflow-hidden mb-4 border border-[#1F1F25]">
                {/* Badge Placeholders */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <div className="h-6 w-16 bg-[#2A2A2F] rounded-sm"></div>
                </div>
                {/* Quick Add Placeholder */}
                <div className="absolute bottom-4 left-4 right-4 h-10 bg-[#2A2A2F] rounded-sm opacity-50"></div>
            </div>

            {/* Content Placeholders */}
            <div className="flex flex-col gap-2">
                {/* Title */}
                <div className="h-4 bg-[#1F1F25] rounded w-3/4"></div>

                {/* Price and Rating Row */}
                <div className="flex items-center justify-between mt-1">
                    <div className="h-5 bg-[#1F1F25] rounded w-16"></div>
                    <div className="h-4 bg-[#1F1F25] rounded w-20"></div>
                </div>

                {/* Scarcity / Stock Text */}
                <div className="h-3 bg-[#1F1F25] rounded w-1/2 mt-1"></div>
            </div>
        </div>
    );
}
