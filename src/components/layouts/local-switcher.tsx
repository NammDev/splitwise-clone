'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Languages, BookA } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()

  const onSelectChange = (locale: string) => {
    startTransition(() => {
      router.replace(`/${locale}`)
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-6'>
          {localActive === 'en' ? <Languages className='size-4' /> : <BookA className='size-4' />}
          <span className='sr-only'>Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => onSelectChange('en')} disabled={isPending}>
          <Languages className='mr-2 size-4' />
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange('vn')} disabled={isPending}>
          <BookA className='mr-2 size-4' />
          <span>Việt Nam</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
