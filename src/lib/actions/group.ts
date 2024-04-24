'use server'

import { db } from '../db'
import { GroupFormValues } from '../schemas'
import { randomId } from '../utils'
import { unstable_cache as cache } from 'next/cache'

export async function getCacheGroup(groupId: string) {
  return await cache(
    async () => {
      return getGroup(groupId)
    },
    [`group-${groupId}`],
    {
      revalidate: 900,
      tags: [`group-${groupId}`],
    }
  )()
}

export async function getGroup(groupId: string) {
  return db.group.findUnique({
    where: { id: groupId },
    include: { participants: true },
  })
}

export async function getGroups(groupIds: string[]) {
  return (
    await db.group.findMany({
      where: { id: { in: groupIds } },
      include: { _count: { select: { participants: true } } },
    })
  ).map((group) => ({
    ...group,
    createdAt: group.createdAt.toISOString(),
  }))
}

export async function createGroup(groupFormValues: GroupFormValues) {
  return db.group.create({
    data: {
      id: randomId(),
      name: groupFormValues.name,
      currency: groupFormValues.currency,
      participants: {
        createMany: {
          data: groupFormValues.participants.map(({ name }) => ({
            id: randomId(),
            name,
          })),
        },
      },
    },
    include: { participants: true },
  })
}

export async function updateGroup(groupId: string, groupFormValues: GroupFormValues) {
  const existingGroup = await getGroup(groupId)
  if (!existingGroup) throw new Error('Invalid group ID')

  return db.group.update({
    where: { id: groupId },
    data: {
      name: groupFormValues.name,
      currency: groupFormValues.currency,
      participants: {
        deleteMany: existingGroup.participants.filter(
          (p) => !groupFormValues.participants.some((p2) => p2.id === p.id)
        ),
        updateMany: groupFormValues.participants
          .filter((participant) => participant.id !== undefined)
          .map((participant) => ({
            where: { id: participant.id },
            data: {
              name: participant.name,
            },
          })),
        createMany: {
          data: groupFormValues.participants
            .filter((participant) => participant.id === undefined)
            .map((participant) => ({
              id: randomId(),
              name: participant.name,
            })),
        },
      },
    },
  })
}
