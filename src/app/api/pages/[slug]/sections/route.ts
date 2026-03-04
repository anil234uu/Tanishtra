import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'pages');

// Helper to reliably read page data
function readPageData(slug: string) {
    const filePath = path.join(DATA_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Helper to write page data with backup
function writePageData(slug: string, data: any) {
    const filePath = path.join(DATA_DIR, `${slug}.json`);

    // Create backup
    if (fs.existsSync(filePath)) {
        const backup = fs.readFileSync(filePath, 'utf-8');
        const backupPath = path.join(DATA_DIR, `${slug}.backup.json`);
        fs.writeFileSync(backupPath, backup);
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// POST: Add a new section to a page
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params;
        const body = await request.json();
        const { type, settings, order } = body;

        if (!type) {
            return NextResponse.json({ error: 'Section type is required' }, { status: 400 });
        }

        const pageData = readPageData(resolvedParams.slug);
        if (!pageData) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        if (!pageData.sections) {
            pageData.sections = [];
        }

        const newSectionId = `sec_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
        const newSection = {
            id: newSectionId,
            type,
            enabled: true,
            order: order !== undefined ? order : pageData.sections.length,
            settings: settings || {}
        };

        pageData.sections.push(newSection);
        writePageData(resolvedParams.slug, pageData);

        return NextResponse.json({ success: true, section: newSection });
    } catch (error) {
        console.error('Error adding section:', error);
        return NextResponse.json({ error: 'Failed to add section' }, { status: 500 });
    }
}

// DELETE: Remove a section from a page
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params;
        const body = await request.json();
        const { sectionId } = body;

        if (!sectionId) {
            return NextResponse.json({ error: 'sectionId is required' }, { status: 400 });
        }

        const pageData = readPageData(resolvedParams.slug);
        if (!pageData || !pageData.sections) {
            return NextResponse.json({ error: 'Page or sections not found' }, { status: 404 });
        }

        const sectionIndex = pageData.sections.findIndex((sec: any) => sec.id === sectionId);
        if (sectionIndex === -1) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        // Remove section
        pageData.sections.splice(sectionIndex, 1);

        // Reorder remaining sections
        pageData.sections.forEach((sec: any, index: number) => {
            sec.order = index;
        });

        writePageData(resolvedParams.slug, pageData);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting section:', error);
        return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
    }
}

// PATCH: Reorder sections
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params;
        const body = await request.json();
        const { sections } = body;

        if (!Array.isArray(sections)) {
            return NextResponse.json({ error: 'sections array is required' }, { status: 400 });
        }

        const pageData = readPageData(resolvedParams.slug);
        if (!pageData || !pageData.sections) {
            return NextResponse.json({ error: 'Page or sections not found' }, { status: 404 });
        }

        // Update order numbers mapping over the submitted array
        sections.forEach(({ id, order }: { id: string, order: number }) => {
            const sec = pageData.sections.find((s: any) => s.id === id);
            if (sec) {
                sec.order = order;
            }
        });

        // Ensure array is continuously sorted logically by order ascending
        pageData.sections.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

        writePageData(resolvedParams.slug, pageData);

        return NextResponse.json({ success: true, sections: pageData.sections });
    } catch (error) {
        console.error('Error reordering sections:', error);
        return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 });
    }
}
