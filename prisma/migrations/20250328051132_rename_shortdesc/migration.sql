/*
  Warnings:

  - You are about to drop the column `shortdesc` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "shortdesc",
ADD COLUMN     "shortDesc" TEXT;
