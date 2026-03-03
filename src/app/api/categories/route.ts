import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'categories.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const categories = JSON.parse(fileContents);
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read categories data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newCategory = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const categories = JSON.parse(fileContents);

        categories.push({ ...newCategory, id: `c${Date.now()}`, count: 0 });

        await fs.writeFile(dataFilePath, JSON.stringify(categories, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        let categories = JSON.parse(fileContents);

        categories = categories.filter((c: any) => c.id !== id);

        await fs.writeFile(dataFilePath, JSON.stringify(categories, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedCategory = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        let categories = JSON.parse(fileContents);

        categories = categories.map((c: any) => c.id === updatedCategory.id ? updatedCategory : c);

        await fs.writeFile(dataFilePath, JSON.stringify(categories, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
