"use client";
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    // Simulated settings loaded from a file/API
    const [settings, setSettings] = useState({
        storeName: 'Tanishtra',
        contactEmail: 'tanishtra@gmail.com',
        contactPhone: '+91 9594700173',
        whatsappNumber: '+91 9594700173',
        address: 'Goregaon West, Mumbai, Maharashtra, India',
        instagramLink: 'https://instagram.com/tanishtra'
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API Save
        setTimeout(() => {
            setIsSaving(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="font-playfair text-3xl md:text-4xl text-text mb-2">Store Settings</h1>
                <p className="font-inter text-text-secondary">Manage absolute global variables affecting your website's contact info and branding.</p>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-6">

                <div className="bg-background-secondary border border-border rounded-lg p-6 md:p-8">
                    <h2 className="font-playfair text-2xl text-text mb-6 pb-4 border-b border-border">Business Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Store Name</label>
                            <input type="text" value={settings.storeName} onChange={e => setSettings({ ...settings, storeName: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Headquarters Address</label>
                            <textarea rows={2} value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors resize-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-background-secondary border border-border rounded-lg p-6 md:p-8">
                    <h2 className="font-playfair text-2xl text-text mb-6 pb-4 border-b border-border">Contact Routing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Support Email</label>
                            <input type="email" value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Contact Phone Number</label>
                            <input type="text" value={settings.contactPhone} onChange={e => setSettings({ ...settings, contactPhone: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">WhatsApp Widget Target</label>
                            <input type="text" value={settings.whatsappNumber} onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                            <p className="font-inter text-[12px] text-text-muted mt-1">This drives the floating green widget.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-montserrat text-[11px] uppercase tracking-[1px] text-text-secondary font-bold">Instagram URL</label>
                            <input type="url" value={settings.instagramLink} onChange={e => setSettings({ ...settings, instagramLink: e.target.value })} className="bg-background border border-border rounded px-4 py-3 text-text font-inter focus:outline-none focus:border-accent-gold transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={isSaving} className={`bg-accent-gold text-background px-8 py-4 rounded font-montserrat uppercase font-bold text-[13px] tracking-[1px] flex items-center gap-2 transition-colors ${isSaving ? 'opacity-70 cursor-wait' : 'hover:bg-accent-gold-light'}`}>
                        <Save size={18} /> {isSaving ? 'SAVING...' : 'SAVE SETTINGS'}
                    </button>
                    {success && (
                        <span className="font-inter text-system-success font-bold animate-in fade-in">✓ Settings updated globally!</span>
                    )}
                </div>
            </form>

        </div>
    );
}
