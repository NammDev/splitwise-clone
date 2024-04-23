'use client'

import { AddGroupByUrlButton } from '@/components/logic-ui/add-group-by-url-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function GroupsPageLayout({ children, reload }: PropsWithChildren<{ reload: () => void }>) {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
        <h1 className='font-bold text-2xl flex-1'>
          <Link href='/groups'>My groups</Link>
        </h1>
        <div className='flex gap-2'>
          {/* <AddGroupByUrlButton reload={reload} /> */}
          <Button asChild>
            <Link href='/groups/create'>Create</Link>
          </Button>
        </div>
      </div>
      <div>{children}</div>
    </>
  )
}
