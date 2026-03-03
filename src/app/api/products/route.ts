import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const products = JSON.parse(fileContents);
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read products data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProduct = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const products = JSON.parse(fileContents);

        products.push({ ...newProduct, id: `p${Date.now()}` });

        await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
        return NextResponse.json({ success: true, product: newProduct });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        let products = JSON.parse(fileContents);

        products = products.filter((p: any) => p.id !== id);

        await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedProduct = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        let products = JSON.parse(fileContents);

        products = products.map((p: any) => p.id === updatedProduct.id ? updatedProduct : p);

        await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
