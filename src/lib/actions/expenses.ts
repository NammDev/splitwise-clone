import { Expense } from '@prisma/client'
import { db } from '../db'
import { randomId } from '../utils'
import { ExpenseFormValues } from '../schemas'
import { getGroup } from './group'

export async function getGroupExpenses(groupId: string) {
  return db.expense.findMany({
    where: { groupId },
    include: {
      paidFor: { include: { participant: true } },
      paidBy: true,
      category: true,
    },
    orderBy: [{ expenseDate: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function createExpense(
  expenseFormValues: ExpenseFormValues,
  groupId: string
): Promise<Expense> {
  const group = await getGroup(groupId)
  if (!group) throw new Error(`Invalid group ID: ${groupId}`)

  for (const participant of [
    expenseFormValues.paidBy,
    ...expenseFormValues.paidFor.map((p) => p.participant),
  ]) {
    if (!group.participants.some((p) => p.id === participant))
      throw new Error(`Invalid participant ID: ${participant}`)
  }

  return db.expense.create({
    data: {
      id: randomId(),
      groupId,
      expenseDate: expenseFormValues.expenseDate,
      categoryId: expenseFormValues.category,
      amount: expenseFormValues.amount,
      title: expenseFormValues.title,
      paidById: expenseFormValues.paidBy,
      splitMode: expenseFormValues.splitMode,
      paidFor: {
        createMany: {
          data: expenseFormValues.paidFor.map((paidFor) => ({
            participantId: paidFor.participant,
            shares: paidFor.shares,
          })),
        },
      },
      isReimbursement: expenseFormValues.isReimbursement,
      documents: {
        createMany: {
          data: expenseFormValues.documents.map((doc) => ({
            id: randomId(),
            url: doc.url,
            width: doc.width,
            height: doc.height,
          })),
        },
      },
      notes: expenseFormValues.notes,
    },
  })
}

export async function getExpense(groupId: string, expenseId: string) {
  return db.expense.findUnique({
    where: { id: expenseId },
    include: { paidBy: true, paidFor: true, category: true, documents: true },
  })
}

export function getTotalGroupSpending(
  expenses: NonNullable<Awaited<ReturnType<typeof getGroupExpenses>>>
): number {
  return expenses.reduce(
    (total, expense) => (expense.isReimbursement ? total : total + expense.amount),
    0
  )
}

export function getTotalActiveUserPaidFor(
  activeUserId: string | null,
  expenses: NonNullable<Awaited<ReturnType<typeof getGroupExpenses>>>
): number {
  return expenses.reduce(
    (total, expense) =>
      expense.paidBy.id === activeUserId && !expense.isReimbursement
        ? total + expense.amount
        : total,
    0
  )
}

export function getTotalActiveUserShare(
  activeUserId: string | null,
  expenses: NonNullable<Awaited<ReturnType<typeof getGroupExpenses>>>
): number {
  let total = 0

  expenses.forEach((expense) => {
    if (expense.isReimbursement) return

    const paidFors = expense.paidFor
    const userPaidFor = paidFors.find((paidFor) => paidFor.participantId === activeUserId)

    if (!userPaidFor) {
      // If the active user is not involved in the expense, skip it
      return
    }

    switch (expense.splitMode) {
      case 'EVENLY':
        // Divide the total expense evenly among all participants
        total += expense.amount / paidFors.length
        break
      case 'BY_AMOUNT':
        // Directly add the user's share if the split mode is BY_AMOUNT
        total += userPaidFor.shares
        break
      case 'BY_PERCENTAGE':
        // Calculate the user's share based on their percentage of the total expense
        total += (expense.amount * userPaidFor.shares) / 10000 // Assuming shares are out of 10000 for percentage
        break
      case 'BY_SHARES':
        // Calculate the user's share based on their shares relative to the total shares
        const totalShares = paidFors.reduce((sum, paidFor) => sum + paidFor.shares, 0)
        total += (expense.amount * userPaidFor.shares) / totalShares
        break
    }
  })

  return parseFloat(total.toFixed(2))
}
