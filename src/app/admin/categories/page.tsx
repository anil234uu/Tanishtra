"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
    image: string;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', image: '', count: 0 });

    const fetchCategories = () => {
        setIsLoading(true);
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => { setCategories(data); setIsLoading(false); })
            .catch(console.error);
    };

    useEffect(() => { fetchCategories(); }, []);

    const openAddModal = () => {
        setEditingCategory(null);
        setFormData({ name: '', slug: '', image: '', count: 0 });
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({ ...category });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            await fetch('/api/categories', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchCategories();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingCategory ? 'PUT' : 'POST';
        const bodyObj = editingCategory ? { ...formData, id: editingCategory.id } : formData;

        await fetch('/api/categories', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyObj)
        });

        setIsModalOpen(false);
        fetchCategories();
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-playfair text-3xl md:text-4xl text-text mb-2">Category Manager</h1>
                    <p className="font-inter text-text-secondary">Organize products into collections.</p>
                </div>
                <button onClick={openAddModal} className="bg-accent-gold text-background px-6 py-3 rounded font-montserrat uppercase font-bold text-sm tracking-[1px] flex items-center gap-2 hover:bg-accent-gold-light transition-colors">
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 flex justify-center"><div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></div></div>
                ) : categories.map(category => (
                    <div key={category.id} className="bg-background-secondary border border-border rounded-lg overflow-hidden group">
                        <div className="relative h-40 w-full bg-[#0F0F12]">
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => openEditModal(category)} className="w-8 h-8 rounded bg-background text-text flex items-center justify-center hover:text-accent-gold transition-colors shadow-dark">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(category.id)} className="w-8 h-8 rounded bg-background text-system-error flex items-center justify-center hover:bg-system-error hover:text-white transition-colors shadow-dark">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 flex justify-between items-center bg-background border-t border-border">
                            <div>
                                <h3 className="font-bebas text-2xl tracking-[2px] text-text mb-1">{category.name}</h3>
                                <p className="font-inter text-sm text-text-muted">/{category.slug}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="font-montserrat text-2xl font-bold text-accent-gold">{category.count}</span>
                                <span className="font-inter text-[11px] uppercase tracking-[1px] text-text-secondary">Products</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
                    <div className="bg-background-secondary border border-border w-full max-w-lg rounded-xl shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="font-playfair text-2xl text-text">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-accent-gold transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-5">
                            <form id="category-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Category Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">URL Slug</label>
                                    <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Cover Image URL</label>
                                    <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                </div>
                                {editingCategory && (
                                    <div className="flex flex-col gap-2">
                                        <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Product Count (Manual Override)</label>
                                        <input type="number" value={formData.count} onChange={e => setFormData({ ...formData, count: Number(e.target.value) })} required className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                                    </div>
                                )}
                            </form>
                        </div>

                        <div className="p-6 border-t border-border bg-background flex justify-end gap-3 rounded-b-xl">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-montserrat text-[12px] uppercase tracking-[1px] font-bold text-text-secondary hover:text-text transition-colors">Cancel</button>
                            <button form="category-form" type="submit" className="bg-accent-gold text-background hover:bg-accent-gold-light transition-colors px-6 py-3 rounded font-montserrat uppercase font-bold text-[12px] tracking-[1px]">
                                {editingCategory ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
