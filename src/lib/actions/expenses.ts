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
