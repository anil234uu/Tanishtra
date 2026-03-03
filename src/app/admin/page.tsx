"use client";
import React, { useEffect, useState } from 'react';
import { Package, Folders, Eye, IndianRupee, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/components/ui/ProductCard';

export default function AdminOverviewPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/products').then(res => res.json()),
            fetch('/api/categories').then(res => res.json())
        ]).then(([prodData, catData]) => {
            setProducts(prodData);
            setCategories(catData);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent-gold border-t-transparent animate-spin rounded-full"></div></div>;
    }

    const activeProducts = products.filter(p => !p.stockText || !p.stockText.includes('Out of stock')).length;
    const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);
    const lowStock = products.filter(p => p.stockText && p.stockText.includes('Only')).length;

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-playfair text-3xl md:text-4xl text-text mb-2">Dashboard Overview</h1>
                <p className="font-inter text-text-secondary">Welcome back. Here's what's happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">

                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-muted font-bold mb-1">Total Products</p>
                            <h3 className="font-bebas text-4xl text-text">{products.length}</h3>
                        </div>
                        <div className="w-10 h-10 rounded bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                            <Package size={20} />
                        </div>
                    </div>
                    <p className="font-inter text-sm text-system-success flex items-center gap-1">
                        <TrendingUp size={14} /> <span>12% from last month</span>
                    </p>
                </div>

                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-muted font-bold mb-1">Total Categories</p>
                            <h3 className="font-bebas text-4xl text-text">{categories.length}</h3>
                        </div>
                        <div className="w-10 h-10 rounded bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                            <Folders size={20} />
                        </div>
                    </div>
                    <Link href="/admin/categories" className="font-inter text-sm text-accent-gold hover:underline">Manage Categories &rarr;</Link>
                </div>

                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-muted font-bold mb-1">Catalog Value</p>
                            <h3 className="font-bebas text-4xl text-text">₹{(totalValue * 10).toLocaleString('en-IN')}</h3> {/* Simulated bulk value */}
                        </div>
                        <div className="w-10 h-10 rounded bg-system-success/10 flex items-center justify-center text-system-success">
                            <IndianRupee size={20} />
                        </div>
                    </div>
                    <p className="font-inter text-sm text-text-muted">Estimated inventory value</p>
                </div>

                <div className="bg-background border border-system-error/30 rounded-lg p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-system-error"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-montserrat text-[11px] uppercase tracking-[1px] text-system-error/80 font-bold mb-1">Low Stock Alerts</p>
                            <h3 className="font-bebas text-4xl text-text">{lowStock}</h3>
                        </div>
                        <div className="w-10 h-10 rounded bg-system-error/10 flex items-center justify-center text-system-error">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                    <p className="font-inter text-sm text-text-secondary">Products running out soon</p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Products Grid */}
                <div className="lg:col-span-2 bg-background border border-border rounded-lg overflow-hidden">
                    <div className="p-5 border-b border-border flex justify-between items-center">
                        <h3 className="font-inter font-bold text-lg text-text">Recently Added Products</h3>
                        <Link href="/admin/products" className="font-montserrat text-[12px] uppercase text-accent-gold hover:underline font-bold">View All</Link>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-background-secondary border-b border-border text-sm font-inter text-text-muted">
                                    <th className="p-4 font-normal">Product</th>
                                    <th className="p-4 font-normal">Category</th>
                                    <th className="p-4 font-normal text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {products.slice(0, 5).map(product => (
                                    <tr key={product.id} className="hover:bg-background-secondary/50 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded bg-background-card overflow-hidden border border-border shrink-0">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-inter text-sm text-text font-bold truncate max-w-[200px] md:max-w-xs">{product.name}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-montserrat text-[10px] uppercase bg-border/50 text-text-secondary px-2 py-1 rounded">{product.category}</span>
                                        </td>
                                        <td className="p-4 text-right font-inter font-bold text-accent-gold text-sm">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions & Store Health */}
                <div className="flex flex-col gap-6">
                    <div className="bg-background border border-border rounded-lg shadow-sm">
                        <div className="p-5 border-b border-border">
                            <h3 className="font-inter font-bold text-lg text-text">Quick Actions</h3>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            <Link href="/admin/products" className="w-full bg-accent-gold text-background hover:bg-accent-gold-light transition-colors py-3 rounded font-montserrat uppercase font-bold text-sm tracking-[1px] text-center">
                                + Add New Product
                            </Link>
                            <Link href="/admin/settings" className="w-full bg-background border border-border text-text hover:border-accent-gold transition-colors py-3 rounded font-montserrat uppercase font-bold text-sm tracking-[1px] text-center">
                                Edit Store Info
                            </Link>
                        </div>
                    </div>

                    <div className="bg-background border border-border rounded-lg shadow-sm p-6">
                        <h3 className="font-inter font-bold text-lg text-text mb-4">Store Health</h3>

                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex justify-between text-sm font-inter mb-2">
                                    <span className="text-text-secondary">Image Optimization</span>
                                    <span className="text-system-success font-bold">100%</span>
                                </div>
                                <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                                    <div className="bg-system-success h-full w-full"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm font-inter mb-2">
                                    <span className="text-text-secondary">API Latency</span>
                                    <span className="text-accent-gold font-bold">42ms</span>
                                </div>
                                <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                                    <div className="bg-accent-gold h-full w-[15%]"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
