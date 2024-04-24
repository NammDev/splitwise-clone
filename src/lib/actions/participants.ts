import { getGroupExpenses } from './expenses'

export async function getGroupExpensesParticipants(groupId: string) {
  const expenses = await getGroupExpenses(groupId)
  return Array.from(
    new Set(expenses.flatMap((e) => [e.paidById, ...e.paidFor.map((pf) => pf.participantId)]))
  )
}
