-- CreateTable
CREATE TABLE "HomePageContent" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "HomePageContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomePageContent_key_key" ON "HomePageContent"("key");
