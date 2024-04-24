// import { Totals } from '@/app/groups/[groupId]/stats/totals'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getGroupExpenses, getTotalGroupSpending } from '@/lib/actions/expenses'
import { getCacheGroup } from '@/lib/actions/group'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Totals } from './_components/totals'

export const metadata: Metadata = {
  title: 'Totals',
}

export default async function TotalsPage({ params: { groupId } }: { params: { groupId: string } }) {
  const group = await getCacheGroup(groupId)
  if (!group) notFound()

  const expenses = await getGroupExpenses(groupId)
  const totalGroupSpendings = getTotalGroupSpending(expenses)

  return (
    <>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>Totals</CardTitle>
          <CardDescription>Spending summary of the entire group.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col space-y-4'>
          <Totals group={group} expenses={expenses} totalGroupSpendings={totalGroupSpendings} />
        </CardContent>
      </Card>
    </>
  )
}
