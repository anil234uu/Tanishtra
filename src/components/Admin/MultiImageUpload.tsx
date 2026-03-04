"use client";
import React, { useState, useCallback, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';

export interface UploadedImage {
    url: string;
    publicId: string;
}

interface MultiImageUploadProps {
    images: UploadedImage[];
    onImagesChange: (images: UploadedImage[]) => void;
    maxImages?: number;
    label?: string;
}

export function MultiImageUpload({
    images,
    onImagesChange,
    maxImages = 6,
    label
}: MultiImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) return;
        if (images.length >= maxImages) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onImagesChange([...images, { url: data.url, publicId: data.publicId }]);
        } catch (error) {
            console.error(error);
            alert("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleRemove = async (index: number) => {
        const imageToRemove = images[index];
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);

        // Optionally delete from Cloudinary but typically we keep it unless strictly requested
    };

    // --- DRAG AND DROP REORDER LOGIC ---
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add slight opacity
        (e.target as HTMLElement).style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedIndex(null);
        (e.target as HTMLElement).style.opacity = '1';
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (draggedIndex === index) return;
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null) return;
        if (draggedIndex === targetIndex) return;

        const newImages = [...images];
        const [movedImage] = newImages.splice(draggedIndex, 1);
        newImages.splice(targetIndex, 0, movedImage);

        onImagesChange(newImages);
        setDraggedIndex(null);
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {(label || images.length > 0) && (
                <div className="flex justify-between items-center mb-1">
                    {label && <label className="font-inter text-[13px] text-[#A1A1AA]">{label}</label>}
                    <span className="font-inter text-[11px] text-[#6B6B73]">
                        {images.length} / {maxImages} images
                    </span>
                </div>
            )}

            <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                    <div
                        key={img.publicId}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`
                            relative bg-[#16161B] border-2 border-[#2A2A2F] rounded-[8px] overflow-hidden aspect-square cursor-grab active:cursor-grabbing hover:border-[#C6A75E] transition-colors
                            ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <Image
                            src={img.url}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover pointer-events-none"
                        />

                        {/* Primary Badge */}
                        {index === 0 && (
                            <span className="absolute bottom-[4px] left-[4px] bg-[#C6A75E] text-[#0B0B0D] font-montserrat text-[8px] uppercase font-bold px-[6px] py-[2px] rounded-[2px] z-10 pointer-events-none">
                                PRIMARY
                            </span>
                        )}

                        {/* Delete Button */}
                        <button
                            onClick={(e) => { e.preventDefault(); handleRemove(index); }}
                            className="absolute top-[4px] right-[4px] w-6 h-6 bg-[rgba(208,66,66,0.9)] text-white flex items-center justify-center rounded-full text-[14px] cursor-pointer hover:bg-[#D04242] transition-colors z-20"
                            aria-label={`Remove image ${index + 1}`}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                {/* ADD IMAGE CARD */}
                {images.length < maxImages && (
                    <label
                        className={`
                            bg-transparent border-2 border-dashed rounded-[8px] aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors group
                            ${isUploading ? 'border-[#C6A75E] opacity-50' : 'border-[#2A2A2F] hover:border-[#C6A75E]'}
                        `}
                    >
                        {isUploading ? (
                            <div className="w-8 h-8 rounded-full border-2 border-[#2A2A2F] border-t-[#C6A75E] animate-spin mb-2"></div>
                        ) : (
                            <>
                                <Plus size={32} className="text-[#6B6B73] mb-1 group-hover:text-[#C6A75E] transition-colors" />
                                <span className="font-inter text-[11px] text-[#6B6B73]">Add</span>
                            </>
                        )}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            disabled={isUploading}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}
