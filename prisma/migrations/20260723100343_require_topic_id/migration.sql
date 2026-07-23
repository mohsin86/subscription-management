/*
  Warnings:

  - You are about to drop the column `category` on the `InterviewQuestion` table. All the data in the column will be lost.
  - Made the column `topicId` on table `InterviewQuestion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "InterviewQuestion_category_idx";

-- AlterTable
ALTER TABLE "InterviewQuestion" DROP COLUMN "category",
ALTER COLUMN "topicId" SET NOT NULL;
