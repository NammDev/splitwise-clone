'use server'

import { GroupForm } from '@/components/logic-ui/group-form'
import { createGroup } from '@/lib/actions/group'
import { GroupFormValues, groupFormSchema } from '@/lib/schemas'
import { redirect } from '@/navigation'

export default async function CreateGroupPage() {
  async function createGroupAction(values: GroupFormValues) {
    'use server'
    const groupFormValues = groupFormSchema.parse(values)
    const group = await createGroup(groupFormValues)
    redirect(`/groups/${group.id}`)
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
        <h1 className='font-bold text-2xl'>Create Group</h1>
      </div>
      <GroupForm onSubmit={createGroupAction} />
    </>
  )
}
