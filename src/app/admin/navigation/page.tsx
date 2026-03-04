import React from 'react';
import NavigationBuilderClient from '@/components/Admin/Navigation/NavigationBuilderClient';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function AdminNavigationPage() {
    const DATA_DIR = path.join(process.cwd(), 'data');
    const FILE_PATH = path.join(DATA_DIR, 'navigation.json');

    let initialNavigation = {
        header: [],
        mobile: [],
        footer: []
    };

    if (fs.existsSync(FILE_PATH)) {
        initialNavigation = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    }

    return <NavigationBuilderClient initialNavigation={initialNavigation} />;
}
