import React from 'react';

interface SectionProps {
    id: string;
    settings: {
        content?: string;
        maxWidth?: string;
    }
}

export default function RichTextSection({ id, settings }: SectionProps) {
    if (!settings.content) return null;

    return (
        <section id={id} className="bg-background py-[80px] px-4 md:px-8">
            <div
                className="mx-auto prose prose-invert prose-p:font-inter prose-headings:font-playfair prose-a:text-accent-gold hover:prose-a:text-accent-gold-light"
                style={{ maxWidth: settings.maxWidth || '800px' }}
                dangerouslySetInnerHTML={{ __html: settings.content }}
            />
        </section>
    );
}
