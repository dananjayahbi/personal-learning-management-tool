import { promises as fs } from 'fs';
import path from 'path';
import { prisma } from './db';

const BUILT_IN_DIR_PATH = path.join(process.cwd(), 'public', 'assets', 'learning-directories');

/**
 * Scans the public/assets/learning-directories folder and returns list of directories
 */
export async function getBuiltInDirectories(): Promise<Array<{ name: string; path: string }>> {
  try {
    const entries = await fs.readdir(BUILT_IN_DIR_PATH, { withFileTypes: true });
    
    const directories = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => ({
        name: formatDirectoryName(entry.name),
        path: path.join(BUILT_IN_DIR_PATH, entry.name),
      }));
    
    return directories;
  } catch (error) {
    console.error('Error reading built-in directories:', error);
    return [];
  }
}

/**
 * Registers built-in directories in the database if they don't exist
 */
export async function syncBuiltInDirectories(): Promise<void> {
  try {
    const builtInDirs = await getBuiltInDirectories();
    
    for (const dir of builtInDirs) {
      // Check if directory already exists
      const existing = await prisma.directory.findUnique({
        where: { path: dir.path },
      });
      
      if (!existing) {
        await prisma.directory.create({
          data: {
            name: dir.name,
            path: dir.path,
            isBuiltIn: true,
            isActive: false,
          },
        });
        console.log(`Registered built-in directory: ${dir.name}`);
      }
    }
  } catch (error) {
    console.error('Error syncing built-in directories:', error);
  }
}

/**
 * Formats directory name from folder name (e.g., "AI-ML-DL" -> "AI ML DL")
 */
function formatDirectoryName(folderName: string): string {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Checks if a path is a built-in directory
 */
export function isBuiltInPath(dirPath: string): boolean {
  const normalized = path.normalize(dirPath);
  const builtInBase = path.normalize(BUILT_IN_DIR_PATH);
  return normalized.startsWith(builtInBase);
}
