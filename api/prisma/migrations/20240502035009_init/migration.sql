-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT DEFAULT 'default',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnauthorizedUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "UnauthorizedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshSessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,

    CONSTRAINT "RefreshSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoriums" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Auditoriums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seats" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "auditoriumId" INTEGER NOT NULL,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservedSeats" (
    "id" SERIAL NOT NULL,
    "seatId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "ReservedSeats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenings" (
    "id" SERIAL NOT NULL,
    "auditoriumId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "screeningStart" TIMESTAMP(3) NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Screenings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "screeningId" INTEGER NOT NULL,
    "userId" INTEGER,
    "unauthorizedUserId" INTEGER,
    "timePurchase" TIMESTAMP(3) NOT NULL,
    "amountSeat" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3),
    "country" TEXT,
    "directore" TEXT,
    "rating" TEXT,
    "description" TEXT,
    "posterLink" TEXT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoviesGenres" (
    "moiveId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "MoviesGenres_pkey" PRIMARY KEY ("moiveId","genreId")
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshSessions_refreshToken_key" ON "RefreshSessions"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "ReservedSeats_seatId_screeningId_key" ON "ReservedSeats"("seatId", "screeningId");

-- CreateIndex
CREATE INDEX "Screenings_movieId_idx" ON "Screenings"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Screenings_auditoriumId_screeningStart_key" ON "Screenings"("auditoriumId", "screeningStart");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshSessions" ADD CONSTRAINT "RefreshSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_auditoriumId_fkey" FOREIGN KEY ("auditoriumId") REFERENCES "Auditoriums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeats" ADD CONSTRAINT "ReservedSeats_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeats" ADD CONSTRAINT "ReservedSeats_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeats" ADD CONSTRAINT "ReservedSeats_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenings" ADD CONSTRAINT "Screenings_auditoriumId_fkey" FOREIGN KEY ("auditoriumId") REFERENCES "Auditoriums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenings" ADD CONSTRAINT "Screenings_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_unauthorizedUserId_fkey" FOREIGN KEY ("unauthorizedUserId") REFERENCES "UnauthorizedUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesGenres" ADD CONSTRAINT "MoviesGenres_moiveId_fkey" FOREIGN KEY ("moiveId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesGenres" ADD CONSTRAINT "MoviesGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
