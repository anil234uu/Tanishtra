"use client";

import { useState, useEffect } from 'react';
import sectionComponents from './sections';

interface Section {
    id: string;
    type: string;
    enabled: boolean;
    order: number;
    settings: Record<string, any>;
}

interface SectionRendererProps {
    sections: Section[];
}

export default function SectionRenderer({ sections: initialSections }: SectionRendererProps) {
    const [sections, setSections] = useState(initialSections);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'CMS_PREVIEW_UPDATE') {
                setSections(event.data.sections);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Sort by order, filter enabled only
    const activeSections = sections
        .filter(section => section.enabled)
        .sort((a, b) => a.order - b.order);

    return (
        <>
            {activeSections.map(section => {
                const Component = sectionComponents[section.type];

                if (!Component) {
                    console.warn(`Unknown section type: ${section.type}`);
                    return null;
                }

                return (
                    <Component
                        key={section.id}
                        id={section.id}
                        settings={section.settings}
                    />
                );
            })}
        </>
    );
}
