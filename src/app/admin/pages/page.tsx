import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FileText, MoreVertical, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPagesList() {
    const DATA_DIR = path.join(process.cwd(), 'data', 'pages');

    // Ensure dir exists
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('.backup.'));

    const pages = files.map(filename => {
        const slug = filename.replace('.json', '');
        const filePath = path.join(DATA_DIR, filename);
        const stats = fs.statSync(filePath);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        return {
            slug,
            name: slug.charAt(0).toUpperCase() + slug.slice(1),
            sectionCount: data.sections?.length || 0,
            lastEdited: stats.mtime,
            isPublished: true // Simplifying for now, if file exists it's published
        };
    }).sort((a, b) => b.lastEdited.getTime() - a.lastEdited.getTime());

    return (
        <div className="p-8 max-w-7xl mx-auto font-inter">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[24px] font-bold text-[#F5F5F7]">Pages</h1>
                    <p className="text-[14px] text-[#A1A1AA] mt-1">Manage your website pages and layouts</p>
                </div>
                <button className="bg-[#C6A75E] text-[#0B0B0D] px-6 py-2.5 rounded-lg font-montserrat text-[13px] font-bold uppercase hover:bg-[#D4B872] transition-colors flex items-center gap-2">
                    <Plus size={16} /> Create New Page
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map(page => (
                    <Link
                        key={page.slug}
                        href={`/admin/pages/${page.slug}`}
                        className="bg-[#16161B] border border-[#1F1F25] rounded-xl p-6 hover:border-[#C6A75E] hover:-translate-y-1 transition-all duration-300 group block relative"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-[#121216] p-3 rounded-lg border border-[#1F1F25] group-hover:border-[#C6A75E] transition-colors">
                                <FileText className="text-[#C6A75E]" size={24} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#121216] border border-[#1F1F25] px-2.5 py-1 rounded-full">
                                    <div className={`w-2 h-2 rounded-full ${page.isPublished ? 'bg-system-success' : 'bg-system-warning'}`}></div>
                                    <span className="text-[11px] font-medium text-[#A1A1AA] uppercase font-montserrat">
                                        {page.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[18px] font-bold text-[#F5F5F7] mb-1 group-hover:text-[#C6A75E] transition-colors">
                                {page.name}
                            </h2>
                            <p className="text-[13px] text-[#A1A1AA] mb-4">
                                {page.sectionCount} section{page.sectionCount !== 1 && 's'}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#1F1F25]">
                            <span className="text-[12px] text-[#6B6B73]">
                                Edited {page.lastEdited.toLocaleDateString()}
                            </span>
                            <span className="text-[12px] font-montserrat font-bold text-[#C6A75E] group-hover:underline">
                                Edit Page →
                            </span>
                        </div>
                    </Link>
                ))}

                {pages.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-[#1F1F25] rounded-xl">
                        <FileText size={48} className="text-[#2A2A2F] mb-4" />
                        <h3 className="text-[16px] text-[#F5F5F7] font-bold mb-1">No pages found</h3>
                        <p className="text-[14px] text-[#6B6B73]">Create your first page to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
