"use client";
import React, { useState, useCallback } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    currentImage?: string;
    onImageUpload: (url: string, publicId: string) => void;
    onImageRemove: () => void;
    label?: string;
    aspectRatio?: string;
}

export function ImageUpload({
    currentImage,
    onImageUpload,
    onImageRemove,
    label,
    aspectRatio
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleUpload = async (file: File) => {
        // Validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, WebP)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            setError('Image must be less than 5MB');
            return;
        }

        setError(null);
        setIsUploading(true);
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onImageUpload(data.url, data.publicId);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            setError('Upload failed. Please try again.');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    }, [handleUpload]);

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {label && (
                <label className="font-inter text-[13px] text-[#A1A1AA]">{label}</label>
            )}

            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`
                    w-full min-h-[200px] rounded-[12px] relative overflow-hidden transition-all duration-300
                    ${isDragging ? 'border-2 border-[#C6A75E] bg-[#C6A75E]/10 scale-[1.02]' :
                        error ? 'border-2 border-solid border-[#D04242] bg-[#16161B]' :
                            'border-2 border-dashed border-[#2A2A2F] bg-[#16161B] hover:border-[#C6A75E] hover:bg-[#C6A75E]/5'}
                `}
                style={{
                    aspectRatio: aspectRatio === '1:1' ? '1 / 1' : aspectRatio === '3:4' ? '3 / 4' : aspectRatio === '16:9' ? '16 / 9' : 'auto'
                }}
            >
                {/* 1. UPLOADING STATE */}
                {isUploading && (
                    <div className="absolute inset-0 bg-[#16161B]/90 flex flex-col items-center justify-center z-20">
                        <div className="w-8 h-8 rounded-full border-2 border-[#2A2A2F] border-t-[#C6A75E] animate-spin mb-4"></div>
                        <p className="font-inter text-[13px] text-[#A1A1AA]">Uploading...</p>
                    </div>
                )}

                {/* 2. SUCCESS STATE */}
                {success && !isUploading && (
                    <div className="absolute inset-0 bg-[#16161B]/90 flex flex-col items-center justify-center z-20">
                        <div className="w-12 h-12 bg-[#4A7C59]/20 rounded-full flex items-center justify-center mb-3 animate-bounce">
                            <CheckCircle2 className="text-[#4A7C59]" size={24} />
                        </div>
                        <p className="font-inter text-[13px] text-[#4A7C59]">Uploaded successfully</p>
                    </div>
                )}

                {/* 3. HAS IMAGE STATE */}
                {currentImage && !isUploading && !success && (
                    <div className="absolute inset-0 group">
                        <Image
                            src={currentImage}
                            alt="Uploaded preview"
                            fill
                            className="object-cover rounded-[8px]"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#0B0B0D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                            <div className="flex gap-3">
                                <label className="cursor-pointer bg-[#C6A75E] text-[#0B0B0D] px-6 py-[10px] font-montserrat text-[12px] uppercase font-bold rounded-[4px] hover:bg-[#D8B76A] transition-colors">
                                    Change Image
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg, image/png, image/webp"
                                        onChange={onFileSelect}
                                    />
                                </label>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onImageRemove();
                                    }}
                                    className="cursor-pointer bg-transparent border border-[#D04242] text-[#D04242] px-6 py-[10px] font-montserrat text-[12px] uppercase rounded-[4px] hover:bg-[#D04242]/10 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                            <a
                                href={currentImage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-inter text-[12px] text-[#A1A1AA] hover:text-[#C6A75E] underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                View Full Size
                            </a>
                        </div>
                    </div>
                )}

                {/* 4. EMPTY STATE */}
                {!currentImage && !isUploading && !success && (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-6 text-center">
                        <UploadCloud size={48} className="text-[#6B6B73] mb-4 group-hover:text-[#C6A75E] transition-colors" />
                        <p className="font-inter text-[16px] text-[#A1A1AA] mb-1">
                            Drag & drop image here
                        </p>
                        <p className="font-inter text-[13px] text-[#6B6B73] mb-2">
                            or click to browse
                        </p>
                        <p className="font-inter text-[11px] text-[#6B6B73]">
                            PNG, JPG, WebP up to 5MB
                        </p>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={onFileSelect}
                        />
                    </label>
                )}
            </div>

            {/* ERROR MESSAGE */}
            {error && (
                <div className="flex items-center gap-2 mt-1">
                    <AlertCircle size={14} className="text-[#D04242]" />
                    <p className="font-inter text-[13px] text-[#D04242]">{error}</p>
                </div>
            )}
        </div>
    );
}
