import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tanishtra.com';

    // In a real app, you would fetch all product IDs and categories from your CMS/database.
    // For now, these are the core static routes.
    const routes = ['', '/about', '/collections', '/contact', '/faq', '/returns', '/shipping', '/wishlist'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
