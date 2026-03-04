import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'pages');

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params;
        const filePath = path.join(DATA_DIR, `${resolvedParams.slug}.json`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: 'Page not found' },
                { status: 404 }
            );
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading page data:', error);
        return NextResponse.json(
            { error: 'Failed to read page data' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params;
        const body = await request.json();
        const filePath = path.join(DATA_DIR, `${resolvedParams.slug}.json`);

        // Ensure directory exists just in case
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        // Create backup before saving
        if (fs.existsSync(filePath)) {
            const backup = fs.readFileSync(filePath, 'utf-8');
            const backupPath = path.join(DATA_DIR, `${resolvedParams.slug}.backup.json`);
            fs.writeFileSync(backupPath, backup);
        }

        fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving page data:', error);
        return NextResponse.json(
            { error: 'Failed to save page data' },
            { status: 500 }
        );
    }
}
