/*
  Warnings:

  - You are about to drop the column `cycle` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `InterviewQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN "billingCycleMonths" INTEGER NOT NULL DEFAULT 1;
UPDATE "Subscription" SET "billingCycleMonths" = 12 WHERE "cycle" = 'YEARLY';
ALTER TABLE "Subscription" DROP COLUMN "cycle";
DROP TYPE "BillingCycle";

