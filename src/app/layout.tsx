// import { ApplePwaSplash } from '@/app/apple-pwa-splash'
// import { env } from '@/lib/env'

import { Toaster } from '@/components/ui/toaster'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { ProgressBar } from '@/components/layouts/progress-bar'
import { ThemeProvider } from '@/components/layouts/theme-provider'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'

import './globals.css'

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
//   title: {
//     default: 'Spliit · Share Expenses with Friends & Family',
//     template: '%s · Spliit',
//   },
//   description:
//     'Spliit is a minimalist web application to share expenses with friends and family. No ads, no account, no problem.',
//   openGraph: {
//     title: 'Spliit · Share Expenses with Friends & Family',
//     description:
//       'Spliit is a minimalist web application to share expenses with friends and family. No ads, no account, no problem.',
//     images: `/banner.png`,
//     type: 'website',
//     url: '/',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     creator: '@scastiel',
//     site: '@scastiel',
//     images: `/banner.png`,
//     title: 'Spliit · Share Expenses with Friends & Family',
//     description:
//       'Spliit is a minimalist web application to share expenses with friends and family. No ads, no account, no problem.',
//   },
//   appleWebApp: {
//     capable: true,
//     title: 'Spliit',
//   },
//   applicationName: 'Spliit',
//   icons: [
//     {
//       url: '/android-chrome-192x192.png',
//       sizes: '192x192',
//       type: 'image/png',
//     },
//     {
//       url: '/android-chrome-512x512.png',
//       sizes: '512x512',
//       type: 'image/png',
//     },
//   ],
// }

export const viewport: Viewport = {
  themeColor: '#047857',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      {/* <ApplePwaSplash icon='/logo-with-text.png' color='#027756' /> */}
      <body className='min-h-[100dvh] flex flex-col items-stretch bg-slate-50 bg-opacity-30 dark:bg-background'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <ProgressBar />
          </Suspense>
          <SiteHeader />
          <div className='flex-1 flex flex-col pt-16'>{children}</div>
          <SiteFooter />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
