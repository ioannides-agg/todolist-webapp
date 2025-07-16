-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "owner" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
