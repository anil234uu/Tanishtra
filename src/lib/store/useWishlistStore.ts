import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/components/ui/ProductCard';

interface WishlistStore {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                if (!get().hasItem(product.id)) {
                    set({ items: [...get().items, product] });
                }
            },
            removeItem: (id) =>
                set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
            hasItem: (id) => get().items.some((item) => item.id === id),
        }),
        {
            name: 'tanishtra-wishlist-storage',
        }
    )
);
