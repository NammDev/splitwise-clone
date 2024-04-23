'use client'
import { RecentGroup, saveRecentGroup } from '@/lib/actions/storage'
import { useEffect } from 'react'

type Props = {
  group: RecentGroup
}

export function SaveGroupLocally({ group }: Props) {
  useEffect(() => {
    saveRecentGroup(group)
  }, [group])

  return null
}
