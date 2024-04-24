// import { MainNav } from './main-nav'
// import { MobileNav } from './mobile-nav'
// import { ProductsCommandMenu } from './product-command-menu'
import { siteConfig } from './site'
import { Button } from '../ui/button'
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        {/* <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mainNav} /> */}
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            {/* <ProductsCommandMenu /> */}
            <Button size='sm'>
              <Link href='/groups'>
                Groups
                <span className='sr-only'>Groups</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
