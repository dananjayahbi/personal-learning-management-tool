import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Get read status for a directory
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const directoryId = searchParams.get('directoryId');

    if (!directoryId) {
      return NextResponse.json(
        { error: 'Directory ID is required' },
        { status: 400 }
      );
    }

    const id = parseInt(directoryId);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid directory ID' },
        { status: 400 }
      );
    }

    const readStatuses = await prisma.readStatus.findMany({
      where: { directoryId: id },
    });

    const bookmarks = await prisma.bookmark.findMany({
      where: { directoryId: id },
    });

    return NextResponse.json({ 
      readStatuses,
      bookmarks,
    });
  } catch (error) {
    console.error('Error fetching read status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch read status' },
      { status: 500 }
    );
  }
}

// POST: Toggle read status
export async function POST(request: NextRequest) {
  try {
    const { directoryId, filePath, isCompleted } = await request.json();

    if (!directoryId || !filePath) {
      return NextResponse.json(
        { error: 'Directory ID and file path are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.readStatus.findUnique({
      where: {
        directoryId_filePath: {
          directoryId,
          filePath,
        },
      },
    });

    let readStatus;
    if (existing) {
      readStatus = await prisma.readStatus.update({
        where: { id: existing.id },
        data: { isCompleted },
      });
    } else {
      readStatus = await prisma.readStatus.create({
        data: {
          directoryId,
          filePath,
          isCompleted,
        },
      });
    }

    return NextResponse.json({ readStatus });
  } catch (error) {
    console.error('Error updating read status:', error);
    return NextResponse.json(
      { error: 'Failed to update read status' },
      { status: 500 }
    );
  }
}
