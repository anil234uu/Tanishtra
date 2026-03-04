import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

// Ensure the file exists
if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify([], null, 2));
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        const fileContents = fs.readFileSync(REVIEWS_FILE, 'utf8');
        const allReviews = JSON.parse(fileContents);

        if (productId) {
            const productReviews = allReviews.filter((r: any) => r.productId === productId);
            return NextResponse.json(productReviews);
        }

        return NextResponse.json(allReviews);
    } catch (error) {
        console.error("Failed to read reviews:", error);
        return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, rating, title, text, author, email } = body;

        // Validation
        if (!productId || !rating || !author) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const fileContents = fs.readFileSync(REVIEWS_FILE, 'utf8');
        const allReviews = JSON.parse(fileContents);

        const newReview = {
            id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            productId,
            rating,
            title,
            text,
            author,
            email, // Used for internal reference, not publicly displayed
            location: "India", // Default fallback
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            verified: false, // Default pending verification
            helpfulCount: 0
        };

        allReviews.unshift(newReview); // Add to beginning

        fs.writeFileSync(REVIEWS_FILE, JSON.stringify(allReviews, null, 2));

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Failed to save review:", error);
        return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
    }
}
