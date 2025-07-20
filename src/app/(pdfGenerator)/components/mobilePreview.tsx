import { Icon } from '@/components/icon'
import { Text } from '@/components/text'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { useResumeBuilder } from '../provider'

export function MobilePreview() {
	const [full, setFull] = useState<boolean>(false)
	const { documentURL } = useResumeBuilder()

	function handleFull() {
		setFull(full => !full)
	}

	return (
		<div className={cn(
			'fixed bottom-0 w-full bg-red-50 h-full',
			'transition-all transition-duration-700 ease-in-out',
			'md:hidden',
			full ? 'max-h-screen' : 'max-h-10'
		)}>
			<div 
				className='cursor-pointer h-10 bg-green-600 flex items-center justify-between px-4'
				onClick={handleFull}
			>
				<Text className='text-white font-semibold' variant='subTitle'>Show preview</Text>
				<Icon type={full ? 'chevron-down' : 'chevron-up'} color='#fff' />
			</div>
			
			{documentURL && (
				<iframe
					// className={full ? 'flex' : 'hidden'}
					src={documentURL}
					id='resume-preview'
					width='100%'
					height='100%'
				/>
			)}
		</div>
	)
}
