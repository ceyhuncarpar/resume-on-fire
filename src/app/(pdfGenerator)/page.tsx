'use client'

import { ResumeBuilderProvider } from './provider'
import { Builder } from  './components/builder'
import { Preview } from './components/preview'
import { Dropdown } from '@/components/dropdown'
	const options = [
		{ value: 'selam', label: 'helo' },
		{ value: 'selam', label: 'helo' },
		{ value: 'selam', label: 'helo' }
	]

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
