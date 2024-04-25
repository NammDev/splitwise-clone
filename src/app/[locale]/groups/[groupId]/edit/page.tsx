import { GroupForm } from '@/components/logic-ui/group-form'
import { getCacheGroup, updateGroup } from '@/lib/actions/group'
import { getGroupExpensesParticipants } from '@/lib/actions/participants'
import { groupFormSchema } from '@/lib/schemas'
import { redirect } from '@/navigation'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function EditGroupPage({
  params: { groupId },
}: {
  params: { groupId: string }
}) {
  const group = await getCacheGroup(groupId)
  if (!group) notFound()

  async function updateGroupAction(values: unknown) {
    'use server'
    const groupFormValues = groupFormSchema.parse(values)
    const group = await updateGroup(groupId, groupFormValues)
    redirect(`/groups/${group.id}`)
  }

  const protectedParticipantIds = await getGroupExpensesParticipants(groupId)
  return (
    <GroupForm
      group={group}
      onSubmit={updateGroupAction}
      protectedParticipantIds={protectedParticipantIds}
    />
  )
}
