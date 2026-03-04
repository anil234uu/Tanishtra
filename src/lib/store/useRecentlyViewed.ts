import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ViewedProduct {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    slug: string;
    viewedAt: number;
}

interface RecentlyViewedState {
    items: ViewedProduct[];
    addViewedProduct: (product: Omit<ViewedProduct, 'viewedAt'>) => void;
    clearHistory: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
    persist(
        (set) => ({
            items: [],
            addViewedProduct: (product) => set((state) => {
                const now = Date.now();

                // Remove the product if it already exists to move it to the front
                const filteredItems = state.items.filter(item => item.id !== product.id);

                // Add the new product at the beginning
                const newItems = [
                    { ...product, viewedAt: now },
                    ...filteredItems
                ];

                // Keep only the 8 most recent
                return { items: newItems.slice(0, 8) };
            }),
            clearHistory: () => set({ items: [] }),
        }),
        {
            name: 'tanishtra-recently-viewed',
        }
    )
);
