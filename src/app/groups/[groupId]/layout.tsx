import { getCacheGroup } from '@/lib/actions/group'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PropsWithChildren, Suspense } from 'react'
import { GroupTabs } from './_components/group-tabs'
import { SaveGroupLocally } from './_components/save-group'
import { ShareButton } from './_components/share-button'

type Props = {
  params: {
    groupId: string
  }
}

export async function generateMetadata({ params: { groupId } }: Props): Promise<Metadata> {
  const group = await getCacheGroup(groupId)

  return {
    title: {
      default: group?.name ?? '',
      template: `%s · ${group?.name} · Spliit`,
    },
  }
}

export default async function GroupLayout({
  children,
  params: { groupId },
}: PropsWithChildren<Props>) {
  const group = await getCacheGroup(groupId)
  if (!group) notFound()

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
        <h1 className='font-bold text-2xl'>
          <Link href={`/groups/${groupId}`}>{group.name}</Link>
        </h1>

        <div className='flex gap-2 justify-between'>
          <Suspense>
            <GroupTabs groupId={groupId} />
          </Suspense>
          <ShareButton group={group} />
        </div>
      </div>

      {children}

      <SaveGroupLocally group={{ id: group.id, name: group.name }} />
    </>
  )
}
