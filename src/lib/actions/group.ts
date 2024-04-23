'use server'

import { db } from '../db'
import { GroupFormValues } from '../schemas'
import { randomId } from '../utils'

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
