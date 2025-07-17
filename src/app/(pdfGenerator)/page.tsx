'use client'

import { ResumeBuilderProvider } from './provider'
import { Builder } from  './components/builder'
import { Preview } from './components/preview'

export default function Home() {
  return (
    <ResumeBuilderProvider>
      <div className='w-full h-full flex'>
        <Builder />
        <Preview />
      </div>
    </ResumeBuilderProvider>
  )
}
