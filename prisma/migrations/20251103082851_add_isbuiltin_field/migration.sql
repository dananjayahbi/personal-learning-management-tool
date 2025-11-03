-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_directories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isBuiltIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_directories" ("createdAt", "id", "isActive", "name", "path", "updatedAt") SELECT "createdAt", "id", "isActive", "name", "path", "updatedAt" FROM "directories";
DROP TABLE "directories";
ALTER TABLE "new_directories" RENAME TO "directories";
CREATE UNIQUE INDEX "directories_path_key" ON "directories"("path");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
