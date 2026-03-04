import React from 'react';
import SettingsClient from '@/components/Admin/Settings/SettingsClient';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const DATA_DIR = path.join(process.cwd(), 'data');
    const FILE_PATH = path.join(DATA_DIR, 'settings.json');

    let initialSettings = {};
    if (fs.existsSync(FILE_PATH)) {
        initialSettings = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    }

    return <SettingsClient initialSettings={initialSettings} />;
}
