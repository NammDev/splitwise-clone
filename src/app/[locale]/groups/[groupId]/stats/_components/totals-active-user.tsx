'use client'

import { useActiveUser } from '@/hooks/use-active-user'
import {
  getGroupExpenses,
  getTotalActiveUserPaidFor,
  getTotalActiveUserShare,
} from '@/lib/actions/expenses'
import { getGroup } from '@/lib/actions/group'
// import { getTotalActiveUserPaidFor } from '@/lib/totals'
import { formatCurrency } from '@/lib/utils'

type Props = {
  group: NonNullable<Awaited<ReturnType<typeof getGroup>>>
  expenses: NonNullable<Awaited<ReturnType<typeof getGroupExpenses>>>
}

export function TotalsActiveUser({ group, expenses }: Props) {
  const activeUser = useActiveUser(group.id)

  const totalYourSpendings =
    activeUser === '' || activeUser === 'None' ? 0 : getTotalActiveUserPaidFor(activeUser, expenses)
  const currency = group.currency

  const totalActiveUserShare =
    activeUser === '' || activeUser === 'None' ? 0 : getTotalActiveUserShare(activeUser, expenses)

  return (
    <>
      <div>
        <div className='text-muted-foreground'>Total you paid for</div>
        <div className='text-lg'>{formatCurrency(currency, totalYourSpendings)}</div>
      </div>
      <div>
        <div className='text-muted-foreground'>Your total share</div>
        <div className='text-lg'>{formatCurrency(currency, totalActiveUserShare)}</div>
      </div>
    </>
  )
}
