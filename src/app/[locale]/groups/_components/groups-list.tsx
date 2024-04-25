'use client'

import { RecentGroups } from '@/lib/actions/storage'
import { RecentGroupsState } from './recent-groups'
import { SetStateAction } from 'react'
import { RecentGroupListCard } from './group-list-card'

export function GroupList({
  groups,
  state,
  setState,
}: {
  groups: RecentGroups
  state: RecentGroupsState
  setState: (state: SetStateAction<RecentGroupsState>) => void
}) {
  return (
    <ul className='grid gap-2 sm:grid-cols-2'>
      {groups.map((group) => (
        <RecentGroupListCard key={group.id} group={group} state={state} setState={setState} />
      ))}
    </ul>
  )
}
