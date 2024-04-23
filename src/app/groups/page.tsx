import { Metadata } from 'next'
import { RecentGroupsPage } from './_components/recent-groups'

export const metadata: Metadata = {
  title: 'Recently visited groups',
}

export default async function GroupsPage() {
  return <RecentGroupsPage />
}
