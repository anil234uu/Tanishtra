"use client";
import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, GripVertical, Trash2, Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';

interface NavLink {
    id: string;
    label: string;
    url: string;
}

interface FooterColumn {
    id: string;
    title: string;
    links: NavLink[];
}

interface NavigationData {
    header: NavLink[];
    mobile: NavLink[];
    footer: FooterColumn[];
}

interface NavigationBuilderProps {
    initialNavigation: NavigationData;
}

export default function NavigationBuilderClient({ initialNavigation }: NavigationBuilderProps) {
    const [nav, setNav] = useState<NavigationData>({
        header: initialNavigation.header || [],
        mobile: initialNavigation.mobile || [],
        footer: initialNavigation.footer || []
    });

    const [activeTab, setActiveTab] = useState<'header' | 'mobile' | 'footer'>('header');
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/navigation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nav),
            });
            if (res.ok) setStatus('success');
            else throw new Error("Failed");
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    // Helper to generate IDs
    const genId = () => Math.random().toString(36).substring(2, 9);

    /* HEADER & MOBILE HANDLERS */
    const handleReorderList = (type: 'header' | 'mobile', newList: NavLink[]) => {
        setNav(prev => ({ ...prev, [type]: newList }));
        setStatus('idle');
    };

    const handleAddLink = (type: 'header' | 'mobile') => {
        setNav(prev => ({
            ...prev,
            [type]: [...prev[type], { id: genId(), label: 'New Link', url: '/' }]
        }));
        setStatus('idle');
    };

    const handleUpdateLink = (type: 'header' | 'mobile', id: string, field: keyof NavLink, value: string) => {
        setNav(prev => ({
            ...prev,
            [type]: prev[type].map(link => link.id === id ? { ...link, [field]: value } : link)
        }));
        setStatus('idle');
    };

    const handleDeleteLink = (type: 'header' | 'mobile', id: string) => {
        setNav(prev => ({
            ...prev,
            [type]: prev[type].filter(link => link.id !== id)
        }));
        setStatus('idle');
    };

    /* FOOTER HANDLERS */
    const handleAddFooterColumn = () => {
        setNav(prev => ({
            ...prev,
            footer: [...prev.footer, { id: genId(), title: 'New Column', links: [] }]
        }));
        setStatus('idle');
    };

    const handleUpdateFooterColTitle = (colId: string, title: string) => {
        setNav(prev => ({
            ...prev,
            footer: prev.footer.map(col => col.id === colId ? { ...col, title } : col)
        }));
        setStatus('idle');
    };

    const handleDeleteFooterColumn = (colId: string) => {
        if (confirm("Delete this column and all its links?")) {
            setNav(prev => ({
                ...prev,
                footer: prev.footer.filter(col => col.id !== colId)
            }));
            setStatus('idle');
        }
    };

    const handleAddFooterLink = (colId: string) => {
        setNav(prev => ({
            ...prev,
            footer: prev.footer.map(col => col.id === colId ? { ...col, links: [...col.links, { id: genId(), label: 'New Link', url: '/' }] } : col)
        }));
        setStatus('idle');
    };

    const handleReorderFooterLinks = (colId: string, newLinks: NavLink[]) => {
        setNav(prev => ({
            ...prev,
            footer: prev.footer.map(col => col.id === colId ? { ...col, links: newLinks } : col)
        }));
        setStatus('idle');
    };

    const handleUpdateFooterLink = (colId: string, linkId: string, field: keyof NavLink, value: string) => {
        setNav(prev => ({
            ...prev,
            footer: prev.footer.map(col => col.id === colId ? {
                ...col,
                links: col.links.map(l => l.id === linkId ? { ...l, [field]: value } : l)
            } : col)
        }));
        setStatus('idle');
    };

    const handleDeleteFooterLink = (colId: string, linkId: string) => {
        setNav(prev => ({
            ...prev,
            footer: prev.footer.map(col => col.id === colId ? {
                ...col,
                links: col.links.filter(l => l.id !== linkId)
            } : col)
        }));
        setStatus('idle');
    };

    return (
        <div className="p-8 max-w-5xl mx-auto font-inter pb-32">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1F1F25]">
                <div>
                    <h1 className="text-[24px] font-bold text-[#F5F5F7]">Navigation Builder</h1>
                    <p className="text-[14px] text-[#A1A1AA] mt-1">Configure your menus, links, and footer layout.</p>
                </div>

                <div className="flex items-center gap-4">
                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-system-success bg-system-success/10 px-3 py-1.5 rounded-full">
                            <CheckCircle2 size={16} />
                            <span className="text-[12px] font-medium">Saved</span>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-system-error bg-system-error/10 px-3 py-1.5 rounded-full">
                            <AlertCircle size={16} />
                            <span className="text-[12px] font-medium">Failed to save</span>
                        </div>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-[#C6A75E] text-[#0B0B0D] px-6 py-2.5 rounded-lg font-montserrat text-[13px] font-bold uppercase hover:bg-[#D4B872] transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save Menus'}
                    </button>
                </div>
            </div>

            <div className="flex border-b border-[#1F1F25] mb-8">
                {['header', 'mobile', 'footer'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`capitalize px-6 py-3 font-medium text-[14px] transition-colors relative ${activeTab === tab ? 'text-[#C6A75E]' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                            }`}
                    >
                        {tab} Menu
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A75E]"></span>
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-[#16161B] border border-[#1F1F25] rounded-xl p-8 min-h-[500px]">

                {/* HEADER & MOBILE TABS */}
                {(activeTab === 'header' || activeTab === 'mobile') && (
                    <div className="max-w-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[18px] font-playfair font-bold text-[#F5F5F7] capitalize">
                                {activeTab} Navigation Links
                            </h2>
                            <button
                                onClick={() => handleAddLink(activeTab)}
                                className="text-[13px] text-[#C6A75E] hover:underline font-bold"
                            >
                                + Add Link
                            </button>
                        </div>

                        {nav[activeTab].length === 0 ? (
                            <div className="text-center py-10 border border-dashed border-[#2A2A2F] rounded-lg">
                                <p className="text-[#6B6B73] text-[14px]">No links configured for {activeTab}.</p>
                            </div>
                        ) : (
                            <Reorder.Group
                                axis="y"
                                values={nav[activeTab]}
                                onReorder={(newOrder) => handleReorderList(activeTab, newOrder)}
                                className="flex flex-col gap-3"
                            >
                                {nav[activeTab].map(link => (
                                    <Reorder.Item
                                        key={link.id}
                                        value={link}
                                        className="flex items-center gap-4 bg-[#121216] border border-[#1F1F25] rounded-lg p-2"
                                    >
                                        <div className="cursor-grab active:cursor-grabbing p-2 text-[#6B6B73]">
                                            <GripVertical size={16} />
                                        </div>
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={link.label}
                                                    onChange={e => handleUpdateLink(activeTab, link.id, 'label', e.target.value)}
                                                    placeholder="Link Label"
                                                    className="w-full bg-transparent border-b border-[#2A2A2F] focus:border-[#C6A75E] text-[#F5F5F7] px-2 py-1.5 text-[14px] focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={link.url}
                                                    onChange={e => handleUpdateLink(activeTab, link.id, 'url', e.target.value)}
                                                    placeholder="/url-path"
                                                    className="w-full bg-transparent border-b border-[#2A2A2F] focus:border-[#C6A75E] text-[#F5F5F7] px-2 py-1.5 text-[14px] focus:outline-none transition-colors font-mono text-[13px]"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteLink(activeTab, link.id)}
                                            className="p-2 text-[#6B6B73] hover:text-[#D04242] transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        )}
                    </div>
                )}

                {/* FOOTER TAB */}
                {activeTab === 'footer' && (
                    <div className="">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[18px] font-playfair font-bold text-[#F5F5F7]">
                                Footer Columns
                            </h2>
                            <button
                                onClick={handleAddFooterColumn}
                                className="text-[13px] text-[#C6A75E] hover:underline font-bold"
                            >
                                + Add Column
                            </button>
                        </div>

                        {nav.footer.length === 0 ? (
                            <div className="text-center py-10 border border-dashed border-[#2A2A2F] rounded-lg">
                                <p className="text-[#6B6B73] text-[14px]">No footer columns configured.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {nav.footer.map(col => (
                                    <div key={col.id} className="bg-[#121216] border border-[#1F1F25] rounded-xl p-6 relative group">
                                        <button
                                            onClick={() => handleDeleteFooterColumn(col.id)}
                                            className="absolute top-4 right-4 text-[#6B6B73] hover:text-[#D04242] opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={14} />
                                        </button>

                                        <input
                                            type="text"
                                            value={col.title}
                                            onChange={e => handleUpdateFooterColTitle(col.id, e.target.value)}
                                            placeholder="Column Title"
                                            className="w-full bg-transparent border-b border-[#2A2A2F] focus:border-[#C6A75E] text-[#F5F5F7] px-0 pb-2 text-[16px] font-bold focus:outline-none transition-colors mb-4"
                                        />

                                        <Reorder.Group
                                            axis="y"
                                            values={col.links}
                                            onReorder={(newOrder) => handleReorderFooterLinks(col.id, newOrder)}
                                            className="flex flex-col gap-2 mb-4"
                                        >
                                            {col.links.map(link => (
                                                <Reorder.Item
                                                    key={link.id}
                                                    value={link}
                                                    className="flex items-center gap-2 bg-[#16161B] border border-[#1F1F25] rounded p-1.5"
                                                >
                                                    <div className="cursor-grab active:cursor-grabbing p-1 text-[#6B6B73]">
                                                        <GripVertical size={14} />
                                                    </div>
                                                    <div className="flex-1 flex flex-col gap-1">
                                                        <input
                                                            type="text"
                                                            value={link.label}
                                                            onChange={e => handleUpdateFooterLink(col.id, link.id, 'label', e.target.value)}
                                                            className="w-full bg-transparent text-[#F5F5F7] text-[13px] px-1 focus:outline-none"
                                                            placeholder="Label"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={link.url}
                                                            onChange={e => handleUpdateFooterLink(col.id, link.id, 'url', e.target.value)}
                                                            className="w-full bg-transparent text-[#A1A1AA] text-[11px] font-mono px-1 focus:outline-none"
                                                            placeholder="/url"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteFooterLink(col.id, link.id)}
                                                        className="p-1 text-[#6B6B73] hover:text-[#D04242] transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>

                                        <button
                                            onClick={() => handleAddFooterLink(col.id)}
                                            className="w-full py-2 border border-dashed border-[#2A2A2F] rounded text-[#A1A1AA] text-[11px] font-montserrat uppercase hover:border-[#C6A75E] hover:text-[#C6A75E] transition-colors"
                                        >
                                            + Add Link
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
