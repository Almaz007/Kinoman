-- DropForeignKey
ALTER TABLE "MoviesGenres" DROP CONSTRAINT "MoviesGenres_moiveId_fkey";

-- AddForeignKey
ALTER TABLE "MoviesGenres" ADD CONSTRAINT "MoviesGenres_moiveId_fkey" FOREIGN KEY ("moiveId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
