import { Metadata } from 'next'
import { RecentGroupList } from './_components/recent-group-list'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Recently visited groups',
}

export default async function GroupsPage() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
        <h1 className='font-bold text-2xl flex-1'>
          <Link href='/groups'>My groups</Link>
        </h1>
        <div className='flex gap-2'>
          {/* <AddGroupByUrlButton reload={reload} /> */}
          <Button asChild>
            <Link href='/groups/create'>Add By URL</Link>
          </Button>
          <Button asChild>
            <Link href='/groups/create'>Create</Link>
          </Button>
        </div>
      </div>
      <div>Group List</div>
    </>
  )
}
