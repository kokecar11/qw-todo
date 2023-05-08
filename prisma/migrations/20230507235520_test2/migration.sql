-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "end_at" DATETIME NOT NULL,
    "fk_user" INTEGER,
    CONSTRAINT "Todo_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("created_at", "done", "end_at", "fk_user", "id", "todo", "updated_at") SELECT "created_at", "done", "end_at", "fk_user", "id", "todo", "updated_at" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
CREATE UNIQUE INDEX "Todo_fk_user_key" ON "Todo"("fk_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
