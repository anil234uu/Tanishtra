import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'tanishtra',
                    resource_type: 'image',
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' },
                        { width: 1200, height: 1200, crop: 'limit' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            success: true,
            url: (result as any).secure_url,
            publicId: (result as any).public_id,
            width: (result as any).width,
            height: (result as any).height,
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { publicId } = await request.json();

        if (!publicId) {
            return NextResponse.json(
                { error: 'No publicId provided' },
                { status: 400 }
            );
        }

        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Delete failed' },
            { status: 500 }
        );
    }
}
