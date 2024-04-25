import { redirect } from '@/navigation'

export default async function GroupPage({ params: { groupId } }: { params: { groupId: string } }) {
  redirect(`/groups/${groupId}/expenses`)
}
