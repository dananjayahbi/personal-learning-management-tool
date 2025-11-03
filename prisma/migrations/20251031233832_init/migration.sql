-- CreateTable
CREATE TABLE "directories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "read_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "directoryId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "read_status_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "directories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "directoryId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookmarks_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "directories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "directories_path_key" ON "directories"("path");

-- CreateIndex
CREATE UNIQUE INDEX "read_status_directoryId_filePath_key" ON "read_status"("directoryId", "filePath");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_directoryId_filePath_key" ON "bookmarks"("directoryId", "filePath");
