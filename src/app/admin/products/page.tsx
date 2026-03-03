"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import type { Product } from '@/components/ui/ProductCard';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '', category: 'CHAIN', price: 0, originalPrice: 0, discount: 0,
        image: '', description: '', isBestseller: false, isNew: false,
        status: 'active', stockText: '', badge: ''
    });

    const fetchProducts = () => {
        setIsLoading(true);
        fetch('/api/products')
            .then(res => res.json())
            .then(data => { setProducts(data); setIsLoading(false); })
            .catch(console.error);
    };

    useEffect(() => { fetchProducts(); }, []);

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ name: '', category: 'CHAIN', price: 0, originalPrice: 0, discount: 0, image: '', description: '', isBestseller: false, isNew: false, status: 'active', stockText: '', badge: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            category: product.category || 'CHAIN',
            price: product.price || 0,
            originalPrice: product.originalPrice || 0,
            discount: product.discount || 0,
            image: product.image || '',
            description: (product as any).description || '',
            isBestseller: !!product.isBestseller,
            isNew: !!product.isNew,
            status: (product as any).status || 'active',
            stockText: product.stockText || '',
            badge: product.badge || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await fetch('/api/products', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchProducts();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingProduct ? 'PUT' : 'POST';
        const bodyObj = editingProduct ? { ...formData, id: editingProduct.id } : formData;

        await fetch('/api/products', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyObj)
        });

        setIsModalOpen(false);
        fetchProducts();
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-playfair text-3xl md:text-4xl text-text mb-2">Products Editor</h1>
                    <p className="font-inter text-text-secondary">Manage your entire catalog, set pricing, and control inventory.</p>
                </div>
                <button onClick={openAddModal} className="bg-accent-gold text-background px-6 py-3 rounded font-montserrat uppercase font-bold text-sm tracking-[1px] flex items-center gap-2 hover:bg-accent-gold-light transition-colors self-start md:self-auto shrink-0">
                    <Plus size={18} /> Add New Product
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-background border border-border rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-[350px]">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background-secondary border border-border rounded pl-10 pr-4 py-2 font-inter text-sm text-text focus:outline-none focus:border-accent-gold transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 text-sm font-inter text-text-muted">
                    <span>{filteredProducts.length} items found</span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-background border border-border rounded-lg overflow-x-auto">
                {isLoading ? (
                    <div className="p-12 flex justify-center"><div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-background-secondary border-b border-border text-xs font-montserrat uppercase tracking-[1px] text-text-muted">
                                <th className="p-4 font-bold">Product</th>
                                <th className="p-4 font-bold">Category</th>
                                <th className="p-4 font-bold">Price</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="hover:bg-background-secondary/50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="w-14 h-14 rounded bg-background-card overflow-hidden border border-border shrink-0">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="font-inter text-sm text-text font-bold block mb-1">{product.name}</span>
                                            <div className="flex items-center gap-2">
                                                {product.isBestseller && <span className="text-[10px] font-montserrat uppercase bg-accent-gold/20 text-accent-gold px-1.5 py-0.5 rounded">Bestseller</span>}
                                                {product.isNew && <span className="text-[10px] font-montserrat uppercase bg-text/20 text-text px-1.5 py-0.5 rounded">New</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-montserrat text-[11px] uppercase border border-border text-text-secondary px-2 py-1 rounded">{product.category}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-inter font-bold text-accent-gold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                                            <span className="font-inter text-[12px] text-text-muted line-through mt-0.5">₹{(product.originalPrice || product.price).toLocaleString('en-IN')}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 w-32">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${((product as any).status || 'active') === 'active' ? 'bg-system-success' : 'bg-text-muted'}`}></div>
                                            <span className="font-inter text-sm text-text capitalize">{(product as any).status || 'active'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => openEditModal(product)} className="text-text hover:text-accent-gold p-2 transition-colors" title="Edit">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="text-system-error hover:text-system-error/70 p-2 transition-colors ml-2" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-text-muted font-inter">No products matched your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Editor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-end md:justify-center items-center backdrop-blur-sm p-0 md:p-6 overflow-hidden">
                    <div className="bg-background-secondary border border-border w-full max-w-2xl md:rounded-xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh] rounded-t-xl">

                        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                            <h2 className="font-playfair text-2xl text-text">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-accent-gold transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
                            <form id="product-form" onSubmit={handleSubmit} className="flex flex-col gap-5">

                                <div className="flex flex-col gap-2">
                                    <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Product Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Category</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors appearance-none">
                                            <option value="CHAIN">CHAIN</option>
                                            <option value="LOCKET & CHAIN">LOCKET & CHAIN</option>
                                            <option value="BRACELET">BRACELET</option>
                                            <option value="KADA">KADA</option>
                                            <option value="RING">RING</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Status</label>
                                        <select value={formData.status || 'active'} onChange={e => setFormData({ ...formData, status: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors appearance-none">
                                            <option value="active">Active</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Sale Price (₹)</label>
                                        <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">MRP (₹)</label>
                                        <input type="number" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Discount %</label>
                                        <input type="number" value={formData.discount} onChange={e => setFormData({ ...formData, discount: Number(e.target.value) })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Image URL</label>
                                    <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Description</label>
                                    <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors resize-none" />
                                </div>

                                <div className="flex items-center gap-6 mt-2 border-t border-border pt-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-border flex items-center justify-center group-hover:border-accent-gold transition-colors">
                                            {formData.isBestseller && <div className="w-3 h-3 bg-accent-gold rounded-sm"></div>}
                                        </div>
                                        <input type="checkbox" checked={formData.isBestseller} onChange={e => setFormData({ ...formData, isBestseller: e.target.checked })} className="hidden" />
                                        <span className="font-inter text-sm text-text">Mark as Bestseller</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-border flex items-center justify-center group-hover:border-accent-gold transition-colors">
                                            {formData.isNew && <div className="w-3 h-3 bg-accent-gold rounded-sm"></div>}
                                        </div>
                                        <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({ ...formData, isNew: e.target.checked })} className="hidden" />
                                        <span className="font-inter text-sm text-text">Mark as New Arrival</span>
                                    </label>
                                </div>

                            </form>
                        </div>

                        <div className="p-6 border-t border-border bg-background shrink-0 flex items-center justify-end gap-3 rounded-b-xl">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-montserrat text-[12px] uppercase tracking-[1px] font-bold text-text-secondary hover:text-text transition-colors">Cancel</button>
                            <button form="product-form" type="submit" className="bg-accent-gold text-background hover:bg-accent-gold-light transition-colors px-6 py-3 rounded font-montserrat uppercase font-bold text-[12px] tracking-[1px]">
                                {editingProduct ? 'Update Product' : 'Save Product'}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
