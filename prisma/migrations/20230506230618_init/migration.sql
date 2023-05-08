-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "end_at" DATETIME NOT NULL,
    "fk_user" INTEGER NOT NULL,
    CONSTRAINT "Todo_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Todo_fk_user_key" ON "Todo"("fk_user");
