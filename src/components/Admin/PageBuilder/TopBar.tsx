"use client";
import React from 'react';
import Link from 'next/link';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface TopBarProps {
    slug: string;
    activeTab: 'editor' | 'preview';
    setActiveTab: (tab: 'editor' | 'preview') => void;
    onSave: () => void;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    previewDevice: 'desktop' | 'tablet' | 'mobile';
    setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export default function TopBar({
    slug,
    activeTab,
    setActiveTab,
    onSave,
    isSaving,
    hasUnsavedChanges,
    previewDevice,
    setPreviewDevice
}: TopBarProps) {
    const formattedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <header className="h-[56px] min-h-[56px] bg-[#16161B] border-b border-[#1F1F25] px-6 flex items-center justify-between z-20 shrink-0">
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <Link href="/admin" className="font-inter text-[14px] text-[#A1A1AA] hover:text-[#C6A75E] transition-colors">
                    ← Back to Admin
                </Link>
                <div className="w-[1px] h-4 bg-[#2A2A2F]"></div>
                <h1 className="font-inter text-[16px] font-bold text-[#F5F5F7]">
                    Editing: {formattedSlug}
                </h1>
            </div>

            {/* CENTER */}
            <div className="flex items-center gap-6">
                <div className="flex bg-[#0B0B0D] p-1 rounded-md border border-[#1F1F25]">
                    <button
                        onClick={() => setActiveTab('editor')}
                        className={`px-4 py-1.5 text-[13px] font-bold rounded-sm transition-colors ${activeTab === 'editor'
                                ? 'bg-[#1F1F25] text-[#F5F5F7]'
                                : 'text-[#6B6B73] hover:text-[#A1A1AA]'
                            }`}
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-1.5 text-[13px] font-bold rounded-sm transition-colors ${activeTab === 'preview'
                                ? 'bg-[#1F1F25] text-[#F5F5F7]'
                                : 'text-[#6B6B73] hover:text-[#A1A1AA]'
                            }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Device Toggles only show in preview tab natively, but we can put them in the center if preview is active */}
                {activeTab === 'preview' && (
                    <div className="flex items-center gap-2 border-l border-[#2A2A2F] pl-6">
                        <button
                            onClick={() => setPreviewDevice('desktop')}
                            className={`p-1.5 rounded transition-colors ${previewDevice === 'desktop' ? 'bg-[#2A2A2F] text-white' : 'text-[#6B6B73] hover:text-white'}`}
                        >
                            <Monitor size={16} />
                        </button>
                        <button
                            onClick={() => setPreviewDevice('tablet')}
                            className={`p-1.5 rounded transition-colors ${previewDevice === 'tablet' ? 'bg-[#2A2A2F] text-white' : 'text-[#6B6B73] hover:text-white'}`}
                        >
                            <Tablet size={16} />
                        </button>
                        <button
                            onClick={() => setPreviewDevice('mobile')}
                            className={`p-1.5 rounded transition-colors ${previewDevice === 'mobile' ? 'bg-[#2A2A2F] text-white' : 'text-[#6B6B73] hover:text-white'}`}
                        >
                            <Smartphone size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${hasUnsavedChanges ? 'bg-system-warning' : 'bg-system-success'}`}></div>
                    <span className="text-[12px] font-inter text-[#A1A1AA]">
                        {hasUnsavedChanges ? 'Unsaved changes' : 'Published'}
                    </span>
                </div>

                <a
                    href={`/?preview=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[36px] flex items-center justify-center bg-transparent border border-[#2A2A2F] text-[#A1A1AA] hover:border-[#C6A75E] hover:text-[#C6A75E] transition-colors rounded px-4 text-[13px] font-inter font-bold"
                >
                    View Live
                </a>

                <button
                    onClick={onSave}
                    disabled={isSaving || !hasUnsavedChanges}
                    className="h-[36px] bg-[#C6A75E] text-[#0B0B0D] font-montserrat text-[13px] uppercase font-bold rounded px-6 hover:bg-[#D4B872] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[100px]"
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </header>
    );
}
