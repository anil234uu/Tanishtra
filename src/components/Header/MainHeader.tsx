import fs from 'fs';
import path from 'path';
import { MainHeaderClient } from './MainHeaderClient';

export function MainHeader() {
    const DATA_DIR = path.join(process.cwd(), 'data');
    const NAV_FILE = path.join(DATA_DIR, 'navigation.json');
    let navData = { header: [], mobile: [], footer: [] };

    try {
        if (fs.existsSync(NAV_FILE)) {
            navData = JSON.parse(fs.readFileSync(NAV_FILE, 'utf-8'));
        }
    } catch (e) { }

    return <MainHeaderClient headerNav={navData.header || []} mobileNav={navData.mobile || []} />;
}
