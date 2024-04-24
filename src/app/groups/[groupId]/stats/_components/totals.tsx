'use client'

import { useActiveUser } from '@/hooks/use-active-user'
import { getGroupExpenses } from '@/lib/actions/expenses'
import { getGroup } from '@/lib/actions/group'
import { formatCurrency } from '@/lib/utils'
import { TotalsActiveUser } from './totals-active-user'

export function Totals({
  group,
  expenses,
  totalGroupSpendings,
}: {
  group: NonNullable<Awaited<ReturnType<typeof getGroup>>>
  expenses: NonNullable<Awaited<ReturnType<typeof getGroupExpenses>>>
  totalGroupSpendings: number
}) {
  const activeUser = useActiveUser(group.id)
  console.log('activeUser', activeUser)

  return (
    <>
      <div>
        <div className='text-muted-foreground'>Total group spendings</div>
        <div className='text-lg'>{formatCurrency(group.currency, totalGroupSpendings)}</div>
      </div>
      {activeUser && activeUser !== 'None' && (
        <TotalsActiveUser group={group} expenses={expenses} />
      )}
    </>
  )
}
