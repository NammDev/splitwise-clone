'use client'

import { useActiveUser } from '@/hooks/use-active-user'
import { getBalances } from '@/lib/actions/balances'
import { cn, formatCurrency } from '@/lib/utils'

type Props = {
  groupId: string
  currency: string
  expense: Parameters<typeof getBalances>[0][number]
}

export function ActiveUserBalance({ groupId, currency, expense }: Props) {
  const activeUserId = useActiveUser(groupId)
  if (activeUserId === null || activeUserId === '' || activeUserId === 'None') {
    return null
  }

  const balances = getBalances([expense])
  let fmtBalance = <>You are not involved</>
  if (Object.hasOwn(balances, activeUserId)) {
    const balance = balances[activeUserId]
    let balanceDetail = <></>
    if (balance.paid > 0 && balance.paidFor > 0) {
      balanceDetail = (
        <>
          {' ('}
          <Money {...{ currency, amount: balance.paid }} />
          {' - '}
          <Money {...{ currency, amount: balance.paidFor }} />
          {')'}
        </>
      )
    }
    fmtBalance = (
      <>
        Your balance: <Money {...{ currency, amount: balance.total }} bold colored />
        {balanceDetail}
      </>
    )
  }
  return <div className='text-xs text-muted-foreground'>{fmtBalance}</div>
}

type MoneyProps = {
  currency: string
  amount: number
  bold?: boolean
  colored?: boolean
}

function Money({ currency, amount, bold = false, colored = false }: MoneyProps) {
  return (
    <span
      className={cn(
        colored && amount <= 1 ? 'text-red-600' : colored && amount >= 1 ? 'text-green-600' : '',
        bold && 'font-bold'
      )}
    >
      {formatCurrency(currency, amount)}
    </span>
  )
}
