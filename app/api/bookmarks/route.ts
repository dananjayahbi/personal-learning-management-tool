import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST: Toggle bookmark
export async function POST(request: NextRequest) {
  try {
    const { directoryId, filePath, isBookmarked } = await request.json();

    if (!directoryId || !filePath) {
      return NextResponse.json(
        { error: 'Directory ID and file path are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        directoryId_filePath: {
          directoryId,
          filePath,
        },
      },
    });

    if (isBookmarked && !existing) {
      const bookmark = await prisma.bookmark.create({
        data: {
          directoryId,
          filePath,
        },
      });
      return NextResponse.json({ bookmark });
    } else if (!isBookmarked && existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to update bookmark' },
      { status: 500 }
    );
  }
}
