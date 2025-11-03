import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

async function buildTree(dirPath: string, relativePath: string = ''): Promise<TreeNode[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const nodes: TreeNode[] = [];

    for (const entry of entries) {
      // Skip hidden files and node_modules
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        const children = await buildTree(fullPath, relPath);
        nodes.push({
          name: entry.name,
          path: relPath,
          type: 'folder',
          children,
        });
      } else if (entry.name.endsWith('.md')) {
        nodes.push({
          name: entry.name,
          path: relPath,
          type: 'file',
        });
      }
    }

    // Sort: folders first, then files, both alphabetically
    return nodes.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error('Error building tree:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { path: dirPath } = await request.json();

    if (!dirPath) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    // Resolve the path - handle both absolute paths and relative paths from public
    let resolvedPath = dirPath;
    
    // Check if it's a built-in directory path (contains public/assets/learning-directories)
    if (dirPath.includes(path.join('public', 'assets', 'learning-directories'))) {
      // It's already the correct path
      resolvedPath = dirPath;
    }

    // Check if path exists
    try {
      const stats = await fs.stat(resolvedPath);
      if (!stats.isDirectory()) {
        return NextResponse.json(
          { error: 'Path is not a directory' },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Path does not exist or is not accessible' },
        { status: 404 }
      );
    }

    const tree = await buildTree(resolvedPath);

    return NextResponse.json({ 
      tree,
      basePath: resolvedPath,
    });
  } catch (error) {
    console.error('Error scanning directory:', error);
    return NextResponse.json(
      { error: 'Failed to scan directory' },
      { status: 500 }
    );
  }
}
