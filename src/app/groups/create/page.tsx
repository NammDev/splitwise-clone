'use server'

import { GroupForm } from '@/components/logic-ui/group-form'
import { createGroup } from '@/lib/actions/group'
import { GroupFormValues, groupFormSchema } from '@/lib/schemas'
import { redirect } from 'next/navigation'

export default async function CreateGroupPage() {
  async function createGroupAction(values: GroupFormValues) {
    'use server'
    const groupFormValues = groupFormSchema.parse(values)
    const group = await createGroup(groupFormValues)
    redirect(`/groups/${group.id}`)
  }

  return <GroupForm onSubmit={createGroupAction} />
}
