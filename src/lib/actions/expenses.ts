import { db } from '../db'

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
