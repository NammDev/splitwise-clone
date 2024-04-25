import { getCategories } from '@/lib/actions/categories'
import { createExpense } from '@/lib/actions/expenses'
import { getCacheGroup } from '@/lib/actions/group'
import { expenseFormSchema } from '@/lib/schemas'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ExpenseForm } from '../_components/expense-form'
import { getRuntimeFeatureFlags } from '@/lib/featureFlag'
import { redirect } from '@/navigation'

export const metadata: Metadata = {
  title: 'Create expense',
}

export default async function ExpensePage({
  params: { groupId },
}: {
  params: { groupId: string }
}) {
  const group = await getCacheGroup(groupId)
  if (!group) notFound()

  const categories = await getCategories()

  async function createExpenseAction(values: unknown) {
    'use server'
    const expenseFormValues = expenseFormSchema.parse(values)
    await createExpense(expenseFormValues, groupId)
    redirect(`/groups/${groupId}`)
  }

  return (
    <Suspense>
      <ExpenseForm
        group={group}
        categories={categories}
        onSubmit={createExpenseAction}
        runtimeFeatureFlags={await getRuntimeFeatureFlags()}
      />
    </Suspense>
  )
}
