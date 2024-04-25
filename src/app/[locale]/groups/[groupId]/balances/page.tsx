import { getBalances, getPublicBalances, getSuggestedReimbursements } from '@/lib/actions/balances'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCacheGroup } from '@/lib/actions/group'
import { getGroupExpenses } from '@/lib/actions/expenses'
import { BalancesList } from './_components/balances-list'
import { ReimbursementList } from './_components/reimbursement-list'

export const metadata: Metadata = {
  title: 'Balances',
}

export default async function GroupPage({ params: { groupId } }: { params: { groupId: string } }) {
  const group = await getCacheGroup(groupId)
  if (!group) notFound()

  const expenses = await getGroupExpenses(groupId)
  const balances = getBalances(expenses)
  const reimbursements = getSuggestedReimbursements(balances)
  const publicBalances = getPublicBalances(reimbursements)

  return (
    <>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>Balances</CardTitle>
          <CardDescription>
            This is the amount that each participant paid or was paid for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BalancesList
            balances={publicBalances}
            participants={group.participants}
            currency={group.currency}
          />
        </CardContent>
      </Card>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>Suggested reimbursements</CardTitle>
          <CardDescription>
            Here are suggestions for optimized reimbursements between participants.
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <ReimbursementList
            reimbursements={reimbursements}
            participants={group.participants}
            currency={group.currency}
            groupId={groupId}
          />
        </CardContent>
      </Card>
    </>
  )
}
