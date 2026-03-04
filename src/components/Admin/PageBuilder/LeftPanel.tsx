"use client";
import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, Trash2, Image, LayoutGrid, Megaphone, Star, Shield, PlayCircle, AlignLeft, Link, Eye, List } from 'lucide-react';
import type { Section } from './PageBuilderClient';

const typeToIcon: Record<string, React.ReactNode> = {
    'hero': <Image size={18} />,
    'productShowcase': <LayoutGrid size={18} />,
    'collectionBanner': <Image size={18} />,
    'editorialBanner': <Image size={18} />,
    'promoBanner': <Megaphone size={18} />,
    'testimonialSlider': <Star size={18} />,
    'trustFeatures': <Shield size={18} />,
    'processSteps': <List size={18} />,
    'instagramGrid': <LayoutGrid size={18} />,
    'newsletter': <Megaphone size={18} />,
    'richText': <AlignLeft size={18} />,
    'imageWithText': <Image size={18} />,
    'video': <PlayCircle size={18} />,
    'customHtml': <Link size={18} />,
    'categoryGrid': <LayoutGrid size={18} />,
    'socialProofTicker': <Megaphone size={18} />
};

const formatSectionName = (type: string) => {
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

interface LeftPanelProps {
    sections: Section[];
    selectedSectionId: string | null;
    setSelectedSectionId: (id: string | null) => void;
    onReorder: (newOrder: Section[]) => void;
    onUpdateSection: (sec: Section) => void;
    onDeleteSection: (id: string) => void;
    onOpenAddModal: () => void;
}

export default function LeftPanel({
    sections,
    selectedSectionId,
    setSelectedSectionId,
    onReorder,
    onUpdateSection,
    onDeleteSection,
    onOpenAddModal
}: LeftPanelProps) {

    const toggleEnabled = (e: React.MouseEvent, sec: Section) => {
        e.stopPropagation();
        onUpdateSection({ ...sec, enabled: !sec.enabled });
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("Delete this section? This action cannot be undone.")) {
            onDeleteSection(id);
        }
    };

    return (
        <aside className="w-[320px] min-w-[320px] bg-[#121216] border-r border-[#1F1F25] flex flex-col h-full shrink-0">
            <div className="p-4 border-b border-[#1F1F25]">
                <h2 className="font-playfair text-[18px] text-[#F5F5F7]">Sections</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
                <Reorder.Group axis="y" values={sections} onReorder={onReorder} className="flex flex-col gap-2">
                    {sections.map(sec => (
                        <Reorder.Item
                            key={sec.id}
                            value={sec}
                            onClick={() => setSelectedSectionId(sec.id)}
                            className={`group flex items-center justify-between p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-colors ${selectedSectionId === sec.id
                                    ? 'bg-[rgba(198,167,94,0.05)] border-[#C6A75E] border-l-[3px]'
                                    : 'bg-[#16161B] border-[#1F1F25] hover:bg-[#1C1C22] hover:border-[#2A2A2F]'
                                } ${!sec.enabled ? 'opacity-50' : ''}`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <GripVertical size={16} className="text-[#6B6B73] shrink-0" />
                                <div className="text-[#A1A1AA] shrink-0">
                                    {typeToIcon[sec.type] || <LayoutGrid size={18} />}
                                </div>
                                <span className={`font-inter text-[14px] text-[#F5F5F7] truncate ${!sec.enabled ? 'line-through' : ''}`}>
                                    {formatSectionName(sec.type)}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-2">
                                <button
                                    onClick={(e) => handleDelete(e, sec.id)}
                                    className="opacity-0 group-hover:opacity-100 text-[#6B6B73] hover:text-[#D04242] transition-colors p-1"
                                    title="Delete Section"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <button
                                    onClick={(e) => toggleEnabled(e, sec)}
                                    className={`relative w-9 h-5 rounded-full transition-colors ${sec.enabled ? 'bg-[#C6A75E]' : 'bg-[#2A2A2F]'}`}
                                >
                                    <span className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-transform ${sec.enabled ? 'left-[18px]' : 'left-[2px]'}`} />
                                </button>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <div className="mt-4 px-2 pb-6">
                    <button
                        onClick={onOpenAddModal}
                        className="w-full py-4 border-2 border-dashed border-[#2A2A2F] rounded-lg text-[#A1A1AA] text-[12px] font-montserrat uppercase font-bold hover:border-[#C6A75E] hover:text-[#C6A75E] transition-colors bg-transparent flex justify-center items-center gap-2"
                    >
                        + Add Section
                    </button>
                </div>
            </div>
        </aside>
    );
}
