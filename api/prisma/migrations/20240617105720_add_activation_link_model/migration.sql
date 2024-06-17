-- CreateTable
CREATE TABLE "ActivationLink" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ActivationLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivationLink" ADD CONSTRAINT "ActivationLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
