import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function POST(request: NextRequest) {
  try {
    const { basePath, filePath } = await request.json();

    if (!basePath || !filePath) {
      return NextResponse.json(
        { error: 'Base path and file path are required' },
        { status: 400 }
      );
    }

    // Security: Ensure the file path is within the base path
    const fullPath = path.join(basePath, filePath);
    const normalizedPath = path.normalize(fullPath);
    const normalizedBase = path.normalize(basePath);

    if (!normalizedPath.startsWith(normalizedBase)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }

    // Check if file exists and is a file
    try {
      const stats = await fs.stat(normalizedPath);
      if (!stats.isFile()) {
        return NextResponse.json(
          { error: 'Path is not a file' },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'File does not exist or is not accessible' },
        { status: 404 }
      );
    }

    // Read file content
    const fileContent = await fs.readFile(normalizedPath, 'utf-8');

    // Parse frontmatter if exists
    const { data: frontmatter, content } = matter(fileContent);

    return NextResponse.json({
      content,
      frontmatter,
      filePath,
      fileName: path.basename(filePath),
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}
