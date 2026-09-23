/*
  Warnings:

  - Added the required column `chunkIndex` to the `PlacementChunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageNumber` to the `PlacementChunk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlacementChunk" ADD COLUMN     "chunkIndex" INTEGER NOT NULL,
ADD COLUMN     "pageNumber" INTEGER NOT NULL;
