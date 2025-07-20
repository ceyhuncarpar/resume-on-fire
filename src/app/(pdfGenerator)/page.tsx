'use client'

import { ResumeBuilderProvider } from './provider'
import { Builder } from  './components/builder'
import { Preview } from './components/preview'
import { cn } from '@/lib/utils'
import { MobilePreview } from './components/mobilePreview'

export default function Home() {
  return (
    <ResumeBuilderProvider>
      <div className={cn([
        'w-full flex flex-col',
        'md:flex-row'
      ])}>
        <Builder />
        <Preview />
        <MobilePreview />
      </div>
    </ResumeBuilderProvider>
  )
}
