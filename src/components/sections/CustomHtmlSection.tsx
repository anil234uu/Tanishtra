import React from 'react';

interface SectionProps {
    id: string;
    settings: {
        html?: string;
    }
}

export default function CustomHtmlSection({ id, settings }: SectionProps) {
    if (!settings.html) return null;

    return (
        <section
            id={id}
            className="w-full"
            dangerouslySetInnerHTML={{ __html: settings.html }}
        />
    );
}
