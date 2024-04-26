// import { MainNav } from './main-nav'
// import { MobileNav } from './mobile-nav'
// import { ProductsCommandMenu } from './product-command-menu'
import { siteConfig } from './site'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ModeToggle } from './mode-toggle'
import { Link } from '@/navigation'
import LocalSwitcher from './local-switcher'
import { useTranslations } from 'next-intl'

// export function SiteHeader() {
//   return (
//     <header className='sticky top-0 z-50 w-full border-b bg-background'>
//       <div className='container flex h-16 items-center'>
//         {/* <MainNav items={siteConfig.mainNav} />
//         <MobileNav items={siteConfig.mainNav} /> */}
//         <div className='flex flex-1 items-center justify-end space-x-4'>
//           <nav className='flex items-center space-x-2'>
//             {/* <ProductsCommandMenu /> */}
//             <Button size='sm'>
//               <Link href='/groups'>
//                 Groups
//                 <span className='sr-only'>Groups</span>
//               </Link>
//             </Button>
//           </nav>
//         </div>
//       </div>
//     </header>
//   )
// }

export function SiteHeader() {
  const t = useTranslations('Components')
  return (
    <header className='fixed top-0 left-0 right-0 h-16 flex justify-between bg-opacity-50 dark:bg-opacity-50 p-2 backdrop-blur-sm z-50 container'>
      <Link className='flex items-center gap-2 hover:scale-105 transition-transform' href='/'>
        <h1>
          <Image
            src='/logo-with-text.png'
            className='m-1 h-auto w-auto'
            width={(35 * 522) / 180}
            height={35}
            alt='Spliit'
          />
        </h1>
      </Link>
      <div role='navigation' aria-label='Menu' className='flex'>
        <ul className='flex items-center text-sm'>
          <li>
            <Button variant='ghost' asChild className='-my-3 text-primary'>
              <Link href='/groups'>{t('groups')}</Link>
            </Button>
          </li>
          <li>
            <LocalSwitcher />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </header>
  )
}
