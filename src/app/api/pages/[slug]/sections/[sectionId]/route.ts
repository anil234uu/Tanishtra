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

// GET: Get single section data
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string, sectionId: string }> }
) {
    try {
        const resolvedParams = await params;
        const pageData = readPageData(resolvedParams.slug);
        if (!pageData || !pageData.sections) {
            return NextResponse.json({ error: 'Page or sections not found' }, { status: 404 });
        }

        const section = pageData.sections.find((sec: any) => sec.id === resolvedParams.sectionId);
        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        return NextResponse.json(section);
    } catch (error) {
        console.error('Error fetching section data:', error);
        return NextResponse.json({ error: 'Failed to read section data' }, { status: 500 });
    }
}

// PUT: Update single section settings
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string, sectionId: string }> }
) {
    try {
        const resolvedParams = await params;
        const body = await request.json();
        const { settings } = body;

        if (!settings) {
            return NextResponse.json({ error: 'settings object is required' }, { status: 400 });
        }

        const pageData = readPageData(resolvedParams.slug);
        if (!pageData || !pageData.sections) {
            return NextResponse.json({ error: 'Page or sections not found' }, { status: 404 });
        }

        const sectionIndex = pageData.sections.findIndex((sec: any) => sec.id === resolvedParams.sectionId);
        if (sectionIndex === -1) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        pageData.sections[sectionIndex].settings = {
            ...pageData.sections[sectionIndex].settings,
            ...settings
        };

        writePageData(resolvedParams.slug, pageData);

        return NextResponse.json({ success: true, section: pageData.sections[sectionIndex] });
    } catch (error) {
        console.error('Error saving section data:', error);
        return NextResponse.json({ error: 'Failed to update section settings' }, { status: 500 });
    }
}

// PATCH: Toggle section enabled/disabled
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string, sectionId: string }> }
) {
    try {
        const resolvedParams = await params;
        const body = await request.json();

        if (typeof body.enabled !== 'boolean') {
            return NextResponse.json({ error: 'enabled boolean requires' }, { status: 400 });
        }

        const pageData = readPageData(resolvedParams.slug);
        if (!pageData || !pageData.sections) {
            return NextResponse.json({ error: 'Page or sections not found' }, { status: 404 });
        }

        const sectionIndex = pageData.sections.findIndex((sec: any) => sec.id === resolvedParams.sectionId);
        if (sectionIndex === -1) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        pageData.sections[sectionIndex].enabled = body.enabled;

        writePageData(resolvedParams.slug, pageData);

        return NextResponse.json({ success: true, section: pageData.sections[sectionIndex] });
    } catch (error) {
        console.error('Error toggling section visibility:', error);
        return NextResponse.json({ error: 'Failed to toggle section visibility' }, { status: 500 });
    }
}
