import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch all resources in the 'tanishtra' folder
        const result = await cloudinary.search
            .expression('folder:tanishtra')
            .sort_by('created_at', 'desc')
            .max_results(500)
            .execute();

        return NextResponse.json({
            resources: result.resources,
            totalCount: result.total_count,
        });
    } catch (error: any) {
        console.error('Cloudinary fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch media resources' },
            { status: 500 }
        );
    }
}
