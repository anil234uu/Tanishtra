"use client";
import React, { useState } from 'react';
import type { Section } from './PageBuilderClient';
import { ImageUpload } from '../ImageUpload';
import { ChevronDown, ChevronRight, GripVertical, Trash2, MousePointer2, Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';

type FieldType = 'text' | 'textarea' | 'image' | 'color' | 'toggle' | 'select' | 'number' | 'url' | 'array' | 'richtext';

export interface FieldDef {
    name: string;
    label: string;
    type: FieldType;
    options?: { label: string, value: string }[];
    schema?: FieldDef[];
}

const SECTION_SCHEMAS: Record<string, FieldDef[]> = {
    hero: [
        { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { name: 'emotionalHook', label: 'Emotional Hook', type: 'text' },
        { name: 'headline', label: 'Headline', type: 'textarea' },
        { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
        { name: 'backgroundImage', label: 'Background Image', type: 'image' },
        { name: 'primaryButtonText', label: 'Primary Button Text', type: 'text' },
        { name: 'primaryButtonLink', label: 'Primary Button Link', type: 'url' },
        { name: 'secondaryButtonText', label: 'Secondary Button Text', type: 'text' },
        { name: 'secondaryButtonLink', label: 'Secondary Button Link', type: 'url' },
        { name: 'trustStrip', label: 'Trust Strip Text', type: 'text' },
        { name: 'showParticles', label: 'Show Particles', type: 'toggle' },
        { name: 'showScrollIndicator', label: 'Show Scroll Indicator', type: 'toggle' },
    ],
    productShowcase: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'displayType', label: 'Display Type', type: 'select', options: [{ label: 'Grid', value: 'grid' }, { label: 'Overlay Cards', value: 'overlay-cards' }] },
        { name: 'columns', label: 'Columns', type: 'number' },
        { name: 'maxProducts', label: 'Max Products', type: 'number' },
        { name: 'filter', label: 'Filter Rule', type: 'select', options: [{ label: 'Bestseller', value: 'bestseller' }, { label: 'New Arrival', value: 'new-arrival' }, { label: 'All', value: 'all' }] },
        { name: 'showRatings', label: 'Show Ratings', type: 'toggle' },
        { name: 'showFilters', label: 'Show Filter Tabs', type: 'toggle' },
        { name: 'cardStyle', label: 'Card Style', type: 'select', options: [{ label: 'Standard', value: 'standard' }, { label: 'Overlay', value: 'overlay' }] },
        { name: 'ctaText', label: 'CTA Text', type: 'text' },
        { name: 'ctaLink', label: 'CTA Link', type: 'url' }
    ],
    editorialBanner: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { name: 'headline', label: 'Headline', type: 'textarea' },
        { name: 'body', label: 'Body Text', type: 'richtext' },
        { name: 'backgroundImage', label: 'Background Image', type: 'image' },
        { name: 'ctaText', label: 'CTA Text', type: 'text' },
        { name: 'ctaLink', label: 'CTA Link', type: 'url' },
        { name: 'parallax', label: 'Parallax Effect', type: 'toggle' },
        { name: 'alignment', label: 'Text Alignment', type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] }
    ],
    collectionBanner: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { name: 'collectionName', label: 'Collection Name', type: 'text' },
        { name: 'tagline', label: 'Tagline', type: 'textarea' },
        { name: 'backgroundImage', label: 'Background Image', type: 'image' },
        { name: 'ctaText', label: 'CTA Text', type: 'text' },
        { name: 'ctaLink', label: 'CTA Link', type: 'url' },
        {
            name: 'featuredProducts', label: 'Featured Products', type: 'array', schema: [
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'tagline', label: 'Tagline', type: 'text' },
                { name: 'price', label: 'Price', type: 'text' },
                { name: 'image', label: 'Image', type: 'image' },
                { name: 'link', label: 'Link', type: 'url' }
            ]
        }
    ],
    testimonialSlider: [
        { name: 'autoRotate', label: 'Auto Rotate', type: 'toggle' },
        { name: 'interval', label: 'Rotation Interval (ms)', type: 'number' },
        {
            name: 'reviews', label: 'Reviews', type: 'array', schema: [
                { name: 'quote', label: 'Quote', type: 'textarea' },
                { name: 'author', label: 'Author Name', type: 'text' },
                { name: 'date', label: 'Date', type: 'text' },
                { name: 'verified', label: 'Verified Buyer', type: 'toggle' },
                { name: 'product', label: 'Product Name', type: 'text' }
            ]
        }
    ],
    trustFeatures: [
        { name: 'columns', label: 'Columns', type: 'number' },
        { name: 'backgroundColor', label: 'Background Color', type: 'color' },
        {
            name: 'features', label: 'Features', type: 'array', schema: [
                { name: 'icon', label: 'Icon Name (lucide)', type: 'text' },
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'description', label: 'Description', type: 'text' }
            ]
        }
    ],
    promoBanner: [
        { name: 'headline', label: 'Headline', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'backgroundImage', label: 'Background Image', type: 'image' },
        { name: 'backgroundColor', label: 'Background Color', type: 'color' },
        { name: 'textColor', label: 'Text Color', type: 'color' },
        { name: 'ctaText', label: 'CTA Text', type: 'text' },
        { name: 'ctaLink', label: 'CTA Link', type: 'url' },
        { name: 'expiryDate', label: 'Expiry Date', type: 'text' }
    ],
    newsletter: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { name: 'headline', label: 'Headline', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'buttonText', label: 'Button Text', type: 'text' },
        { name: 'privacyText', label: 'Privacy Text', type: 'text' },
        { name: 'successMessage', label: 'Success Message', type: 'text' }
    ],
    categoryGrid: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        {
            name: 'categories', label: 'Categories', type: 'array', schema: [
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'image', label: 'Image', type: 'image' },
                { name: 'link', label: 'Link URL', type: 'url' },
                { name: 'productCount', label: 'Product Count Header', type: 'text' }
            ]
        }
    ]
};

interface RightPanelEditorProps {
    section: Section | null;
    onUpdate: (updatedSection: Section) => void;
}

export default function RightPanelEditor({ section, onUpdate }: RightPanelEditorProps) {
    if (!section) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0B0B0D]">
                <MousePointer2 size={48} className="text-[#2A2A2F] mb-4" />
                <h2 className="font-playfair text-[20px] text-[#F5F5F7] mb-2">Select a section to edit</h2>
                <p className="font-inter text-[14px] text-[#6B6B73]">Click any section in the left panel to modify its settings.</p>
            </div>
        );
    }

    const schema = SECTION_SCHEMAS[section.type] || [];

    const handleSettingChange = (name: string, value: any) => {
        onUpdate({
            ...section,
            settings: {
                ...section.settings,
                [name]: value
            }
        });
    };

    return (
        <div className="p-8 pb-32 max-w-[800px] w-full mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F1F25]">
                <div>
                    <h2 className="font-playfair text-[24px] text-[#F5F5F7]">{section.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
                    <span className="font-montserrat text-[11px] text-[#C6A75E] uppercase tracking-wider">{section.type}</span>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                    <span className="font-inter text-[13px] text-[#A1A1AA]">Enabled</span>
                    <div className={`relative w-10 h-6 rounded-full transition-colors ${section.enabled ? 'bg-[#C6A75E]' : 'bg-[#2A2A2F] group-hover:bg-[#3F3F46]'}`}>
                        <span className={`absolute top-[2px] w-5 h-5 bg-[#0B0B0D] rounded-full transition-transform ${section.enabled ? 'left-[18px]' : 'left-[2px]'}`} />
                    </div>
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={section.enabled}
                        onChange={(e) => onUpdate({ ...section, enabled: e.target.checked })}
                    />
                </label>
            </div>

            {/* Fields */}
            {schema.length === 0 ? (
                <div className="p-6 bg-[#16161B] border border-[#1F1F25] border-dashed rounded-lg text-center">
                    <p className="font-inter text-[13px] text-[#6B6B73]">No schema defined for `{section.type}` yet.</p>
                    <p className="font-inter text-[12px] text-[#A1A1AA] mt-2">Any raw JSON settings will be preserved.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {schema.map(field => (
                        <FieldRenderer
                            key={field.name}
                            field={field}
                            value={section.settings[field.name]}
                            onChange={(val) => handleSettingChange(field.name, val)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// --------------------------------------------------------
// RECURSIVE FIELD RENDERER
// --------------------------------------------------------
function FieldRenderer({ field, value, onChange }: { field: FieldDef, value: any, onChange: (val: any) => void }) {

    if (field.type === 'text' || field.type === 'url' || field.type === 'color') {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[13px] text-[#A1A1AA]">{field.label}</label>
                <div className="relative">
                    <input
                        type={field.type === 'color' ? 'color' : 'text'}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                        className={`w-full bg-[#16161B] border border-[#1F1F25] text-[#F5F5F7] rounded-md focus:border-[#C6A75E] focus:outline-none transition-colors ${field.type === 'color' ? 'h-11 p-1' : 'px-4 py-2.5 font-inter text-[14px]'}`}
                    />
                    {field.type === 'color' && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[12px] font-mono text-[#A1A1AA]">
                            {value || '#'}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (field.type === 'number') {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[13px] text-[#A1A1AA]">{field.label}</label>
                <input
                    type="number"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full bg-[#16161B] border border-[#1F1F25] text-[#F5F5F7] px-4 py-2.5 rounded-md font-inter text-[14px] focus:border-[#C6A75E] focus:outline-none transition-colors"
                />
            </div>
        );
    }

    if (field.type === 'textarea' || field.type === 'richtext') {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[13px] text-[#A1A1AA]">{field.label}</label>
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    rows={4}
                    className="w-full bg-[#16161B] border border-[#1F1F25] text-[#F5F5F7] px-4 py-3 rounded-md font-inter text-[14px] focus:border-[#C6A75E] focus:outline-none transition-colors resize-y min-h-[100px]"
                />
                {field.type === 'richtext' && (
                    <span className="text-[11px] text-[#6B6B73]">Supports basic HTML formatting (e.g. &lt;b&gt;, &lt;br/&gt;)</span>
                )}
            </div>
        );
    }

    if (field.type === 'toggle') {
        const isChecked = value === true; // strict boolean
        return (
            <label className="flex items-center justify-between p-4 bg-[#16161B] border border-[#1F1F25] rounded-md cursor-pointer group">
                <span className="font-inter text-[14px] text-[#F5F5F7]">{field.label}</span>
                <div className={`relative w-10 h-6 rounded-full transition-colors ${isChecked ? 'bg-[#C6A75E]' : 'bg-[#2A2A2F] group-hover:bg-[#3F3F46]'}`}>
                    <span className={`absolute top-[2px] w-5 h-5 bg-[#0B0B0D] rounded-full transition-transform ${isChecked ? 'left-[18px]' : 'left-[2px]'}`} />
                </div>
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={(e) => onChange(e.target.checked)}
                />
            </label>
        );
    }

    if (field.type === 'select' && field.options) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="font-inter text-[13px] text-[#A1A1AA]">{field.label}</label>
                <div className="relative">
                    <select
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-[#16161B] border border-[#1F1F25] text-[#F5F5F7] px-4 py-2.5 rounded-md font-inter text-[14px] focus:border-[#C6A75E] focus:outline-none transition-colors appearance-none"
                    >
                        <option value="" disabled>Select an option</option>
                        {field.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B73] pointer-events-none" />
                </div>
            </div>
        );
    }

    if (field.type === 'image') {
        return (
            <div className="flex flex-col gap-1.5">
                <ImageUpload
                    label={field.label}
                    currentImage={value}
                    onImageUpload={(url) => onChange(url)}
                    onImageRemove={() => onChange('')}
                    aspectRatio="auto"
                />
            </div>
        );
    }

    if (field.type === 'array' && field.schema) {
        const items: any[] = Array.isArray(value) ? value : [];

        const handleAddItem = () => {
            const newItem: any = {};
            field.schema!.forEach(sub => newItem[sub.name] = '');
            newItem._id = Math.random().toString(36).substring(2, 9); // stable local key
            onChange([...items, newItem]);
        };

        const handleUpdateItem = (index: number, subName: string, subValue: any) => {
            const newArray = [...items];
            newArray[index] = { ...newArray[index], [subName]: subValue };
            onChange(newArray);
        };

        const handleDeleteItem = (index: number) => {
            const newArray = [...items];
            newArray.splice(index, 1);
            onChange(newArray);
        };

        const handleReorderItems = (newOrder: any[]) => {
            onChange(newOrder);
        };

        return (
            <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-[#1F1F25]">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair text-[18px] text-[#F5F5F7]">{field.label}</h3>
                    <span className="bg-[#1F1F25] text-[#A1A1AA] px-2 py-0.5 rounded text-[11px] font-mono">{items.length} items</span>
                </div>

                <Reorder.Group axis="y" values={items} onReorder={handleReorderItems} className="flex flex-col gap-3">
                    {items.map((item, index) => (
                        <ArrayItemCard
                            key={item._id || index}
                            item={item}
                            schema={field.schema!}
                            index={index}
                            onUpdate={(subName, subVal) => handleUpdateItem(index, subName, subVal)}
                            onDelete={() => handleDeleteItem(index)}
                        />
                    ))}
                </Reorder.Group>

                <button
                    onClick={handleAddItem}
                    className="mt-2 w-full py-3 border-2 border-dashed border-[#2A2A2F] rounded-lg text-[#A1A1AA] text-[12px] font-montserrat uppercase font-bold hover:border-[#C6A75E] hover:text-[#C6A75E] transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={16} /> Add Item
                </button>
            </div>
        );
    }

    return null;
}

// --------------------------------------------------------
// ARRAY ITEM COLLAPSIBLE CARD
// --------------------------------------------------------
function ArrayItemCard({ item, schema, index, onUpdate, onDelete }: { item: any, schema: FieldDef[], index: number, onUpdate: (name: string, val: any) => void, onDelete: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Identify a title for the collapsed view
    const titleField = schema.find(s => s.type === 'text');
    const displayTitle = titleField && item[titleField.name] ? item[titleField.name] : `Item ${index + 1}`;

    return (
        <Reorder.Item value={item} className="bg-[#121216] border border-[#1F1F25] rounded-lg overflow-hidden flex flex-col">
            {/* Header (always visible) */}
            <div className="flex items-center justify-between p-3 bg-[#16161B] cursor-pointer group" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center gap-3">
                    <div className="text-[#6B6B73] cursor-grab active:cursor-grabbing p-1" onClick={e => e.stopPropagation()}>
                        <GripVertical size={16} />
                    </div>
                    <span className="font-inter text-[14px] text-[#F5F5F7] font-medium">{displayTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="text-[#6B6B73] hover:text-[#D04242] p-2 transition-colors"
                        title="Delete Item"
                    >
                        <Trash2 size={14} />
                    </button>
                    <div className={`text-[#6B6B73] transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>

            {/* Body (expanded) */}
            {isExpanded && (
                <div className="p-5 border-t border-[#1F1F25] flex flex-col gap-5 bg-[#0B0B0D]">
                    {schema.map(subField => (
                        <FieldRenderer
                            key={subField.name}
                            field={subField}
                            value={item[subField.name]}
                            onChange={(val) => onUpdate(subField.name, val)}
                        />
                    ))}
                </div>
            )}
        </Reorder.Item>
    );
}
