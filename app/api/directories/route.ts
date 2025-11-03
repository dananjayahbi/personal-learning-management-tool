import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Get all directories
export async function GET() {
  try {
    const directories = await prisma.directory.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            readStatuses: { where: { isCompleted: true } },
            bookmarks: true,
          },
        },
      },
    });

    const activeDirectory = directories.find(d => d.isActive);

    return NextResponse.json({ 
      directories,
      activeDirectory: activeDirectory || null,
    });
  } catch (error) {
    console.error('Error fetching directories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch directories' },
      { status: 500 }
    );
  }
}

// POST: Create a new directory
export async function POST(request: NextRequest) {
  try {
    const { name, path } = await request.json();

    if (!name || !path) {
      return NextResponse.json(
        { error: 'Name and path are required' },
        { status: 400 }
      );
    }

    // Check if path already exists
    const existing = await prisma.directory.findUnique({
      where: { path },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A directory with this path already exists' },
        { status: 409 }
      );
    }

    // If this is the first directory, make it active
    const directoryCount = await prisma.directory.count();
    const isFirstDirectory = directoryCount === 0;

    // If this should be active, deactivate others
    if (isFirstDirectory) {
      await prisma.directory.updateMany({
        data: { isActive: false },
      });
    }

    const directory = await prisma.directory.create({
      data: {
        name,
        path,
        isActive: isFirstDirectory,
      },
    });

    return NextResponse.json({ directory }, { status: 201 });
  } catch (error) {
    console.error('Error creating directory:', error);
    return NextResponse.json(
      { error: 'Failed to create directory' },
      { status: 500 }
    );
  }
}
