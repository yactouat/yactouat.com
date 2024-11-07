import fs from 'fs-extra';
import { glob } from 'glob';

async function cleanupDist() {
    // get all TypeScript source files
    const srcFiles = glob.sync('src/**/*.ts').map(file => {
        // Convert src path to expected dist path
        return file
            .replace(/^src\//, 'dist/')
            .replace(/\.ts$/, '.js');
    });

    // get all files currently in dist
    const distFiles = glob.sync('dist/**/*.js');

    // find files in dist that don't have a corresponding source file
    const filesToDelete = distFiles.filter(distFile => {
        const relativePath = distFile;
        return !srcFiles.includes(relativePath);
    });

    // delete obsolete files
    for (const file of filesToDelete) {
        try {
            await fs.remove(file);
            console.log(`Removed obsolete file: ${file}`);
            
            // also remove any associated source map file
            const mapFile = `${file}.map`;
            if (await fs.pathExists(mapFile)) {
                await fs.remove(mapFile);
                console.log(`Removed obsolete source map: ${mapFile}`);
            }
        } catch (error) {
            console.error(`Error removing file ${file}:`, error);
        }
    }
}

cleanupDist().catch(console.error); 