/*
  Warnings:

  - Added the required column `link` to the `ActivationLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivationLink" ADD COLUMN     "link" TEXT NOT NULL;
