import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, Twitter, Youtube } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export function Footer() {
    const DATA_DIR = path.join(process.cwd(), 'data');

    // Read Settings
    let settings = { brand: {}, contact: {}, social: {} };
    try {
        const settingsFile = path.join(DATA_DIR, 'settings.json');
        if (fs.existsSync(settingsFile)) {
            settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
        }
    } catch (e) { }

    // Read Navigation
    let nav = { footer: [] };
    try {
        const navFile = path.join(DATA_DIR, 'navigation.json');
        if (fs.existsSync(navFile)) {
            nav = JSON.parse(fs.readFileSync(navFile, 'utf-8'));
        }
    } catch (e) { }

    const brandName = (settings.brand as any)?.siteName || 'TANISHTRA';
    const tagline = (settings.brand as any)?.tagline || 'Crafted for Men Who Command Presence';

    return (
        <footer className="bg-background border-t border-border mt-auto">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10 md:py-16">

                <div className="flex flex-wrap gap-12 md:gap-8 justify-between">

                    {/* BRAND COLUMN */}
                    <div className="flex flex-col w-full md:w-auto md:max-w-xs shrink-0">
                        <Link href="/" className="inline-block">
                            <span className="font-bebas text-3xl tracking-[4px] text-accent-gold">{brandName.toUpperCase()}</span>
                        </Link>
                        <p className="font-inter text-[13px] text-text-muted mt-2 max-w-xs">
                            {tagline}
                        </p>
                        <div className="flex gap-4 mt-6">
                            {(settings.social as any)?.instagram && (
                                <a href={(settings.social as any).instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {(settings.social as any)?.facebook && (
                                <a href={(settings.social as any).facebook} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {(settings.social as any)?.youtube && (
                                <a href={(settings.social as any).youtube} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                    <Youtube size={20} />
                                </a>
                            )}
                            {(settings.social as any)?.twitter && (
                                <a href={(settings.social as any).twitter} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {(settings.contact as any)?.whatsapp && (
                                <a href={`https://wa.me/${(settings.contact as any).whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-gold transition-colors">
                                    <MessageCircle size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* DYNAMIC CMS COLUMNS */}
                    {(nav.footer || []).map((col: any) => (
                        <div key={col.id} className="flex flex-col min-w-[140px]">
                            <h3 className="font-montserrat text-[13px] uppercase text-text mb-6 tracking-[2px]">{col.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {(col.links || []).map((link: any) => (
                                    <li key={link.id}><Link href={link.url} className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">{link.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* CONTACT INFO (If Not Empty) */}
                    {((settings.contact as any)?.phone || (settings.contact as any)?.email || (settings.contact as any)?.address) && (
                        <div className="flex flex-col min-w-[140px]">
                            <h3 className="font-montserrat text-[13px] uppercase text-text mb-6 tracking-[2px]">CONTACT</h3>
                            <ul className="flex flex-col gap-3">
                                {(settings.contact as any)?.phone && (
                                    <li>
                                        <a href={`tel:${(settings.contact as any).phone}`} className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">
                                            {(settings.contact as any).phone}
                                        </a>
                                    </li>
                                )}
                                {(settings.contact as any)?.email && (
                                    <li>
                                        <a href={`mailto:${(settings.contact as any).email}`} className="font-inter text-sm text-text-secondary hover:text-accent-gold transition-colors">
                                            {(settings.contact as any).email}
                                        </a>
                                    </li>
                                )}
                                {(settings.contact as any)?.address && (
                                    <li>
                                        <span className="font-inter text-sm text-text-secondary block mt-1 whitespace-pre-wrap">
                                            {(settings.contact as any).address}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                </div>

                {/* BOTTOM BAR */}
                <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-[13px] text-text-muted">
                        &copy; {new Date().getFullYear()} {brandName}. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                        <div className="h-[24px] w-[38px] bg-background-card rounded border border-border flex items-center justify-center text-[10px] font-bold">VISA</div>
                        <div className="h-[24px] w-[38px] bg-background-card rounded border border-border flex items-center justify-center text-[10px] font-bold">MC</div>
                        <div className="h-[24px] w-[38px] bg-background-card rounded border border-border flex items-center justify-center text-[10px] font-bold">UPI</div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
