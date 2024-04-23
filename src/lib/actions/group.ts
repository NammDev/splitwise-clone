'use server'

import { db } from '../db'

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
