-- CreateEnum
CREATE TYPE "SplitMode" AS ENUM ('EVENLY', 'BY_SHARES', 'BY_PERCENTAGE', 'BY_AMOUNT');

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT '$',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "expenseDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "title" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL,
    "paidById" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "isReimbursement" BOOLEAN NOT NULL DEFAULT false,
    "splitMode" "SplitMode" NOT NULL DEFAULT 'EVENLY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseDocument" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "expenseId" TEXT,

    CONSTRAINT "ExpenseDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensePaidFor" (
    "expenseId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "shares" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ExpensePaidFor_pkey" PRIMARY KEY ("expenseId","participantId")
);

-- CreateIndex
CREATE INDEX "Participant_groupId_idx" ON "Participant"("groupId");

-- CreateIndex
CREATE INDEX "Expense_groupId_idx" ON "Expense"("groupId");

-- CreateIndex
CREATE INDEX "Expense_categoryId_idx" ON "Expense"("categoryId");

-- CreateIndex
CREATE INDEX "Expense_paidById_idx" ON "Expense"("paidById");

-- CreateIndex
CREATE INDEX "ExpenseDocument_expenseId_idx" ON "ExpenseDocument"("expenseId");

-- CreateIndex
CREATE INDEX "ExpensePaidFor_participantId_idx" ON "ExpensePaidFor"("participantId");
