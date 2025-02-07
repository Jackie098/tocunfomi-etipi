/*
  Warnings:

  - A unique constraint covering the columns `[discord_nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discord_nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discord_nickname" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_discord_nickname_key" ON "User"("discord_nickname");
