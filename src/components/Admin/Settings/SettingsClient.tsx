"use client";
import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { ImageUpload } from '../ImageUpload';

interface SettingsClientProps {
    initialSettings: any;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
    const [settings, setSettings] = useState(initialSettings || {});
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (group: string, key: string, value: any) => {
        setSettings((prev: any) => ({
            ...prev,
            [group]: {
                ...(prev[group] || {}),
                [key]: value
            }
        }));
        setStatus('idle');
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) setStatus('success');
            else throw new Error("Failed to save");
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto font-inter pb-32">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1F1F25]">
                <div>
                    <h1 className="text-[24px] font-bold text-[#F5F5F7]">Global Settings</h1>
                    <p className="text-[14px] text-[#A1A1AA] mt-1">Manage brand identity, colors, typography, and SEO.</p>
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
                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3 space-y-2">
                    {/* Simplified side nav for groups */}
                    {['brand', 'colors', 'typography', 'contact', 'social', 'seo', 'features'].map(g => (
                        <a key={g} href={`#${g}`} className="block px-4 py-2 rounded-lg text-[14px] text-[#A1A1AA] hover:bg-[#16161B] hover:text-[#F5F5F7] capitalize transition-colors">
                            {g}
                        </a>
                    ))}
                </div>

                <div className="md:col-span-9 space-y-8">
                    {/* BRAND */}
                    <Section id="brand" title="Brand Identity">
                        <Input label="Site Name" val={settings.brand?.siteName} onChange={(v) => handleChange('brand', 'siteName', v)} />
                        <Input label="Tagline" val={settings.brand?.tagline} onChange={(v) => handleChange('brand', 'tagline', v)} />

                        <div className="pt-4">
                            <label className="block text-[13px] text-[#A1A1AA] mb-2">Logo Image</label>
                            <ImageUpload
                                currentImage={settings.brand?.logo}
                                onImageUpload={(url) => handleChange('brand', 'logo', url)}
                                onImageRemove={() => handleChange('brand', 'logo', '')}
                            />
                        </div>
                    </Section>

                    {/* COLORS */}
                    <Section id="colors" title="Colors (Hex)">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ColorInput label="Background (Primary)" val={settings.colors?.background} onChange={(v) => handleChange('colors', 'background', v)} />
                            <ColorInput label="Surface (Secondary)" val={settings.colors?.surface} onChange={(v) => handleChange('colors', 'surface', v)} />
                            <ColorInput label="Card (Tertiary)" val={settings.colors?.card} onChange={(v) => handleChange('colors', 'card', v)} />
                            <ColorInput label="Accent (Gold)" val={settings.colors?.accent} onChange={(v) => handleChange('colors', 'accent', v)} />
                            <ColorInput label="Text Primary" val={settings.colors?.textPrimary} onChange={(v) => handleChange('colors', 'textPrimary', v)} />
                            <ColorInput label="Text Secondary" val={settings.colors?.textSecondary} onChange={(v) => handleChange('colors', 'textSecondary', v)} />
                        </div>
                    </Section>

                    {/* TYPOGRAPHY */}
                    <Section id="typography" title="Typography">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select label="Heading Font" val={settings.typography?.heading} options={["Playfair Display", "Cormorant Garamond", "Cinzel"]} onChange={(v) => handleChange('typography', 'heading', v)} />
                            <Select label="Body Font" val={settings.typography?.body} options={["Inter", "Outfit", "DM Sans", "Roboto"]} onChange={(v) => handleChange('typography', 'body', v)} />
                            <Select label="Display Font" val={settings.typography?.display} options={["Bebas Neue", "Oswald", "Anton"]} onChange={(v) => handleChange('typography', 'display', v)} />
                            <Select label="Label Font" val={settings.typography?.label} options={["Montserrat", "Poppins", "Lato"]} onChange={(v) => handleChange('typography', 'label', v)} />
                        </div>
                    </Section>

                    {/* CONTACT */}
                    <Section id="contact" title="Contact Information">
                        <Input label="Email Address" val={settings.contact?.email} onChange={(v) => handleChange('contact', 'email', v)} />
                        <Input label="Phone Number" val={settings.contact?.phone} onChange={(v) => handleChange('contact', 'phone', v)} />
                        <Input label="WhatsApp Number" val={settings.contact?.whatsapp} onChange={(v) => handleChange('contact', 'whatsapp', v)} />
                        <Textarea label="Physical Address" val={settings.contact?.address} onChange={(v) => handleChange('contact', 'address', v)} />
                    </Section>

                    {/* SOCIAL MEDIA */}
                    <Section id="social" title="Social Media Links">
                        <Input label="Instagram URL" val={settings.social?.instagram} onChange={(v) => handleChange('social', 'instagram', v)} />
                        <Input label="Facebook URL" val={settings.social?.facebook} onChange={(v) => handleChange('social', 'facebook', v)} />
                        <Input label="YouTube URL" val={settings.social?.youtube} onChange={(v) => handleChange('social', 'youtube', v)} />
                        <Input label="Twitter/X URL" val={settings.social?.twitter} onChange={(v) => handleChange('social', 'twitter', v)} />
                    </Section>

                    {/* SEO */}
                    <Section id="seo" title="Search Engine Optimization">
                        <Input label="Default Page Title" val={settings.seo?.defaultTitle} onChange={(v) => handleChange('seo', 'defaultTitle', v)} />
                        <Input label="Title Separator (e.g., | or -)" val={settings.seo?.titleSeparator} onChange={(v) => handleChange('seo', 'titleSeparator', v)} />
                        <Textarea label="Default Meta Description" val={settings.seo?.defaultDescription} onChange={(v) => handleChange('seo', 'defaultDescription', v)} />

                        <div className="pt-4">
                            <label className="block text-[13px] text-[#A1A1AA] mb-2">Default OG Image (Social Share Image)</label>
                            <ImageUpload
                                currentImage={settings.seo?.ogImage}
                                onImageUpload={(url) => handleChange('seo', 'ogImage', url)}
                                onImageRemove={() => handleChange('seo', 'ogImage', '')}
                            />
                        </div>
                    </Section>

                    {/* FEATURES */}
                    <Section id="features" title="Global Feature Flags">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Toggle label="WhatsApp Widget" val={settings.features?.whatsappWidget} onChange={(v) => handleChange('features', 'whatsappWidget', v)} />
                            <Toggle label="Back to Top Button" val={settings.features?.backToTop} onChange={(v) => handleChange('features', 'backToTop', v)} />
                            <Toggle label="Cookie Consent" val={settings.features?.cookieConsent} onChange={(v) => handleChange('features', 'cookieConsent', v)} />
                            <Toggle label="Exit Intent Popup" val={settings.features?.exitIntent} onChange={(v) => handleChange('features', 'exitIntent', v)} />
                            <Toggle label="Scroll Progress Bar" val={settings.features?.scrollProgress} onChange={(v) => handleChange('features', 'scrollProgress', v)} />
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

// Helper UI Components
function Section({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
    return (
        <section id={id} className="bg-[#16161B] border border-[#1F1F25] rounded-xl p-6 scroll-mt-24">
            <h2 className="text-[18px] font-playfair font-bold text-[#F5F5F7] mb-6">{title}</h2>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

function Input({ label, val, onChange }: { label: string, val: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-[13px] text-[#A1A1AA] mb-1.5">{label}</label>
            <input
                type="text"
                value={val || ''}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-[#121216] border border-[#1F1F25] text-[#F5F5F7] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#C6A75E] transition-colors"
            />
        </div>
    );
}

function Textarea({ label, val, onChange }: { label: string, val: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-[13px] text-[#A1A1AA] mb-1.5">{label}</label>
            <textarea
                value={val || ''}
                onChange={e => onChange(e.target.value)}
                rows={3}
                className="w-full bg-[#121216] border border-[#1F1F25] text-[#F5F5F7] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#C6A75E] transition-colors resize-y"
            />
        </div>
    );
}

function ColorInput({ label, val, onChange }: { label: string, val: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-[13px] text-[#A1A1AA] mb-1.5">{label}</label>
            <div className="relative flex items-center bg-[#121216] border border-[#1F1F25] rounded-lg overflow-hidden focus-within:border-[#C6A75E] transition-colors">
                <input
                    type="color"
                    value={val || '#000000'}
                    onChange={e => onChange(e.target.value)}
                    className="w-10 h-10 p-1 bg-transparent border-none cursor-pointer"
                />
                <input
                    type="text"
                    value={val || ''}
                    onChange={e => onChange(e.target.value)}
                    className="flex-1 bg-transparent border-none text-[#F5F5F7] px-3 py-2 text-[14px] font-mono focus:outline-none uppercase"
                />
            </div>
        </div>
    );
}

function Select({ label, val, options, onChange }: { label: string, val: string, options: string[], onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-[13px] text-[#A1A1AA] mb-1.5">{label}</label>
            <select
                value={val || ''}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-[#121216] border border-[#1F1F25] text-[#F5F5F7] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#C6A75E] transition-colors appearance-none"
            >
                <option value="" disabled>Select font</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

function Toggle({ label, val, onChange }: { label: string, val: boolean, onChange: (v: boolean) => void }) {
    const isChecked = val === true;
    return (
        <label className="flex items-center justify-between p-3.5 bg-[#121216] border border-[#1F1F25] rounded-lg cursor-pointer group hover:border-[#2A2A2F]">
            <span className="font-inter text-[13px] text-[#F5F5F7]">{label}</span>
            <div className={`relative w-9 h-5 rounded-full transition-colors ${isChecked ? 'bg-[#C6A75E]' : 'bg-[#2A2A2F] group-hover:bg-[#3F3F46]'}`}>
                <span className={`absolute top-[2px] w-4 h-4 bg-[#0B0B0D] rounded-full transition-transform ${isChecked ? 'left-[18px]' : 'left-[2px]'}`} />
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={isChecked}
                onChange={e => onChange(e.target.checked)}
            />
        </label>
    );
}
