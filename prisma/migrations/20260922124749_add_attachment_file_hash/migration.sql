/*
  Warnings:

  - A unique constraint covering the columns `[fileHash]` on the table `Attachment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "fileHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_fileHash_key" ON "Attachment"("fileHash");
