import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// DELETE: Remove a directory
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid directory ID' },
        { status: 400 }
      );
    }

    const directory = await prisma.directory.findUnique({
      where: { id },
    });

    if (!directory) {
      return NextResponse.json(
        { error: 'Directory not found' },
        { status: 404 }
      );
    }

    await prisma.directory.delete({
      where: { id },
    });

    // If the deleted directory was active, activate the first remaining one
    if (directory.isActive) {
      const firstDirectory = await prisma.directory.findFirst({
        orderBy: { createdAt: 'asc' },
      });

      if (firstDirectory) {
        await prisma.directory.update({
          where: { id: firstDirectory.id },
          data: { isActive: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting directory:', error);
    return NextResponse.json(
      { error: 'Failed to delete directory' },
      { status: 500 }
    );
  }
}

// PATCH: Update directory (mainly for setting active)
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const { isActive } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid directory ID' },
        { status: 400 }
      );
    }

    // If setting this directory as active, deactivate all others
    if (isActive) {
      await prisma.directory.updateMany({
        data: { isActive: false },
      });
    }

    const directory = await prisma.directory.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ directory });
  } catch (error) {
    console.error('Error updating directory:', error);
    return NextResponse.json(
      { error: 'Failed to update directory' },
      { status: 500 }
    );
  }
}
