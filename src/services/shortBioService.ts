import fs from 'fs';
import path from 'path';

export const readShortBio = () => {
    const shortBioPath = path.join(__dirname, '..', '..', 'html', 'short-bio.html');
    return fs.readFileSync(shortBioPath, 'utf8');
}
