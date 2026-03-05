import React from 'react';
import { RecentlyViewed } from '@/components/Ecommerce/Recommendations/RecentlyViewed';

interface RecentlyViewedSectionProps {
    settings: {
        title?: string;
    }
}

export default function RecentlyViewedSection({ settings }: RecentlyViewedSectionProps) {
    return (
        <RecentlyViewed title={settings.title || "Continue Browsing"} />
    );
}
