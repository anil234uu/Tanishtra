import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'navigation.json');

export async function GET() {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            return NextResponse.json(
                { error: 'Navigation not found' },
                { status: 404 }
            );
        }

        const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading navigation data:', error);
        return NextResponse.json(
            { error: 'Failed to read navigation data' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        // Create backup before saving
        if (fs.existsSync(FILE_PATH)) {
            const backup = fs.readFileSync(FILE_PATH, 'utf-8');
            const backupPath = path.join(DATA_DIR, 'navigation.backup.json');
            fs.writeFileSync(backupPath, backup);
        }

        fs.writeFileSync(FILE_PATH, JSON.stringify(body, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving navigation data:', error);
        return NextResponse.json(
            { error: 'Failed to save navigation data' },
            { status: 500 }
        );
    }
}
