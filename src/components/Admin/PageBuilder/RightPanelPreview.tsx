"use client";
import React, { useState, useEffect } from 'react';
import type { Section } from './PageBuilderClient';

interface RightPanelPreviewProps {
    sections: Section[];
    previewDevice: 'desktop' | 'tablet' | 'mobile';
}

export default function RightPanelPreview({ sections, previewDevice }: RightPanelPreviewProps) {
    // Generate the local preview URL.
    // We can pass a flag to tell the frontend to use local localStorage for preview config
    // OR just use standard Next.js iframe and rely on the fact that if they hit Save it shows up.
    // For true instant live preview without backend saving every stroke, we must inject state.
    // The prompt mentions: "Shows the page with current unsaved changes".
    // We can accomplish this by posting a message to the iframe with the new JSON.

    const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);

    // Sync state with iframe
    useEffect(() => {
        if (iframeRef && iframeRef.contentWindow) {
            // Post message to the Next.js app running inside the iframe
            // App needs window.addEventListener('message') to override sections
            iframeRef.contentWindow.postMessage({
                type: 'CMS_PREVIEW_UPDATE',
                sections: sections.filter(s => s.enabled).sort((a, b) => a.order - b.order)
            }, '*');
        }
    }, [sections, iframeRef]);

    const getWidth = () => {
        if (previewDevice === 'mobile') return '375px';
        if (previewDevice === 'tablet') return '768px';
        return '100%';
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0B0B0D]">
            <div
                className="bg-white border border-[#1F1F25] rounded-lg overflow-hidden transition-all duration-500 shadow-2xl h-full flex flex-col relative"
                style={{ width: getWidth(), maxWidth: '100%' }}
            >
                {/* Simulated browser header */}
                <div className="bg-[#121216] border-b border-[#1F1F25] px-4 py-2 flex items-center gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#D04242]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#E5A50A]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#3FB950]"></div>
                    <div className="flex-1 text-center bg-[#16161B] rounded mx-4 py-1 flex items-center justify-center">
                        <span className="text-[11px] font-mono text-[#6B6B73]">localhost:3000/?preview=true</span>
                    </div>
                </div>

                <iframe
                    ref={setIframeRef}
                    src="/?preview=true"
                    className="w-full flex-1 bg-background"
                    style={{ border: 'none' }}
                    title="Live Preview"
                />
            </div>
            <p className="mt-4 font-inter text-[12px] text-[#6B6B73]">
                Changes are injected live. Click Save to persist to database.
            </p>
        </div>
    );
}
