'use client'

import {
  RecentGroups,
  getArchivedGroups,
  getRecentGroups,
  getStarredGroups,
} from '@/lib/actions/storage'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getGroups } from '@/lib/actions/group'
import { GroupsPageLayout } from './groups-page'
import { GroupList } from './groups-list'

export type RecentGroupsState =
  | { status: 'pending' }
  | {
      status: 'partial'
      groups: RecentGroups
      starredGroups: string[]
      archivedGroups: string[]
    }
  | {
      status: 'complete'
      groups: RecentGroups
      groupsDetails: Awaited<ReturnType<typeof getGroups>>
      starredGroups: string[]
      archivedGroups: string[]
    }

function sortGroups(state: RecentGroupsState & { status: 'complete' | 'partial' }) {
  const starredGroupInfo = []
  const groupInfo = []
  const archivedGroupInfo = []
  for (const group of state.groups) {
    if (state.starredGroups.includes(group.id)) {
      starredGroupInfo.push(group)
    } else if (state.archivedGroups.includes(group.id)) {
      archivedGroupInfo.push(group)
    } else {
      groupInfo.push(group)
    }
  }
  return {
    starredGroupInfo,
    groupInfo,
    archivedGroupInfo,
  }
}

export function RecentGroupsPage() {
  const [state, setState] = useState<RecentGroupsState>({ status: 'pending' })

  function loadGroups() {
    const groupsInStorage = getRecentGroups()
    const starredGroups = getStarredGroups()
    const archivedGroups = getArchivedGroups()
    setState({
      status: 'partial',
      groups: groupsInStorage,
      starredGroups,
      archivedGroups,
    })
    getGroups(groupsInStorage.map((g) => g.id)).then((groupsDetails) => {
      setState({
        status: 'complete',
        groups: groupsInStorage,
        groupsDetails,
        starredGroups,
        archivedGroups,
      })
    })
  }

  useEffect(() => {
    loadGroups()
  }, [])

  if (state.status === 'pending') {
    return (
      <GroupsPageLayout reload={loadGroups}>
        <p>
          <Loader2 className='w-4 m-4 mr-2 inline animate-spin' /> Loading recent groups…
        </p>
      </GroupsPageLayout>
    )
  }

  if (state.groups.length === 0) {
    return (
      <GroupsPageLayout reload={loadGroups}>
        <div className='text-sm space-y-2'>
          <p>You have not visited any group recently.</p>
          <p>
            <Button variant='link' asChild className='-m-4'>
              <Link href={`/groups/create`}>Create one</Link>
            </Button>{' '}
            or ask a friend to send you the link to an existing one.
          </p>
        </div>
      </GroupsPageLayout>
    )
  }

  const { starredGroupInfo, groupInfo, archivedGroupInfo } = sortGroups(state)

  return (
    <GroupsPageLayout reload={loadGroups}>
      <h2 className='mb-2'>Starred groups</h2>
      {starredGroupInfo.length > 0 && (
        <GroupList groups={starredGroupInfo} state={state} setState={setState} />
      )}

      <h2 className='mt-6 mb-2'>Recent groups</h2>
      {groupInfo.length > 0 && <GroupList groups={groupInfo} state={state} setState={setState} />}

      <h2 className='mt-6 mb-2 opacity-50'>Archived groups</h2>
      {archivedGroupInfo.length > 0 && (
        <div className='opacity-50'>
          <GroupList groups={archivedGroupInfo} state={state} setState={setState} />
        </div>
      )}
    </GroupsPageLayout>
  )
}
