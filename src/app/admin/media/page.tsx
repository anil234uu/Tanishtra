"use client";
import React, { useEffect, useState, useRef } from 'react';
import { UploadCloud, Trash2, Copy, Search, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface CloudinaryResource {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    folder: string;
    url: string;
    secure_url: string;
}

export default function MediaLibraryPage() {
    const [resources, setResources] = useState<CloudinaryResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchMedia = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/media');
            const data = await res.json();
            if (data.resources) setResources(data.resources);
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const files = Array.from(e.target.files);
        let successCount = 0;

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) successCount++;
            } catch (error) {
                console.error('Error uploading file:', file.name, error);
            }
        }

        setIsUploading(false);
        if (successCount > 0) {
            // Refresh the media library
            fetchMedia();
        }
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (publicId: string) => {
        if (!confirm('Are you sure you want to permanently delete this image from Cloudinary?')) return;

        try {
            const res = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ publicId }),
            });

            if (res.ok) {
                // Optimistic UI update
                setResources(prev => prev.filter(r => r.public_id !== publicId));
            } else {
                alert('Failed to delete image.');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optional: Could add a nice toast notification here
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const filteredResources = resources.filter(res =>
        res.public_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.format.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-playfair text-3xl md:text-4xl text-text mb-2">Media Library</h1>
                    <p className="font-inter text-text-secondary">View and manage all uploaded images stored in Cloudinary.</p>
                </div>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                <button
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className={`bg-accent-gold text-background px-6 py-3 rounded font-montserrat uppercase font-bold text-sm tracking-[1px] flex items-center gap-2 transition-colors self-start md:self-auto shrink-0 ${isUploading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-gold-light'}`}
                >
                    {isUploading ? (
                        <><div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div> Uploading...</>
                    ) : (
                        <><UploadCloud size={18} /> Upload Images</>
                    )}
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-background border border-border rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-[350px]">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by filename or extension..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background-secondary border border-border rounded pl-10 pr-4 py-2 font-inter text-sm text-text focus:outline-none focus:border-accent-gold transition-colors"
                    />
                </div>
                <div className="flex items-center gap-6 text-sm font-inter text-text-muted">
                    <div className="flex items-center gap-2">
                        <ImageIcon size={16} />
                        <span>{filteredResources.length} Assets</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-border"></div>
                    <span className="hidden md:inline-block">Total Size: {formatBytes(filteredResources.reduce((acc, curr) => acc + curr.bytes, 0))}</span>
                </div>
            </div>

            {/* Media Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filteredResources.length === 0 ? (
                <div className="bg-background border border-border rounded-lg p-12 text-center flex flex-col items-center justify-center">
                    <ImageIcon size={48} className="text-border mb-4" />
                    <h3 className="font-inter text-xl text-text font-bold mb-2">No media found</h3>
                    <p className="font-inter text-text-secondary mb-6">{searchQuery ? 'Try adjusting your search query.' : 'Upload your first image to get started.'}</p>
                    {!searchQuery && (
                        <button onClick={handleUploadClick} className="text-accent-gold hover:text-accent-gold-light uppercase font-montserrat text-sm tracking-[1px] font-bold transition-colors">
                            Upload Now
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredResources.map((resource) => (
                        <div key={resource.asset_id} className="group bg-background border border-border rounded-lg overflow-hidden flex flex-col transition-all hover:border-accent-gold/50 hover:shadow-lg">

                            {/* Image Preview */}
                            <div className="relative aspect-square bg-[#0a0a0c] overflow-hidden">
                                <img
                                    src={resource.secure_url}
                                    alt={resource.public_id}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                    <button
                                        onClick={() => window.open(resource.secure_url, '_blank')}
                                        className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-text hover:text-accent-gold hover:border-accent-gold transition-colors"
                                        title="View Full Size"
                                    >
                                        <ExternalLink size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(resource.public_id)}
                                        className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-system-error hover:bg-system-error/10 hover:border-system-error transition-colors"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Asset Info */}
                            <div className="p-3 flex flex-col gap-1.5 border-t border-border bg-background-secondary flex-1">
                                <div className="flex justify-between items-start gap-2">
                                    <p className="font-inter text-[11px] text-text font-bold leading-tight truncate" title={resource.public_id}>
                                        {resource.public_id.split('/').pop()}
                                    </p>
                                    <span className="font-montserrat text-[9px] uppercase tracking-wider text-text-muted bg-background border border-border px-1.5 py-0.5 rounded">
                                        {resource.format}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <p className="font-inter text-[10px] text-text-muted">
                                        {resource.width}x{resource.height} • {formatBytes(resource.bytes)}
                                    </p>
                                    <button
                                        onClick={() => copyToClipboard(resource.secure_url)}
                                        className="text-text-muted hover:text-accent-gold transition-colors cursor-pointer"
                                        title="Copy URL"
                                    >
                                        <Copy size={12} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
