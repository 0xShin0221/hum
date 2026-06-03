import type { Metadata } from 'next'
import './globals.css'
import ClientBootstrap from '@/components/ClientBootstrap'
import TweaksPanel from '@/components/Tweaks'

export const metadata: Metadata = {
  title: 'Hum — AI, always in your ear.',
  description: 'Hands-free through your earbuds. Ideas, conversations, meetings — all remembered.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inline script runs synchronously before React hydration to avoid theme flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('hum.theme'),l=localStorage.getItem('hum.lang'),a=localStorage.getItem('hum.accent');if(t)document.documentElement.setAttribute('data-theme',t);if(l)document.documentElement.setAttribute('lang',l);if(a&&a!=='emerald')document.documentElement.setAttribute('data-accent',a);}catch(e){}` }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <div id="tweaks-root" />
        <TweaksPanel />
        <ClientBootstrap />
      </body>
    </html>
  )
}
