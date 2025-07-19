import { Icon } from '@/components/icon'
import { Text } from '@/components/text';
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface SectionProps {
	children: ReactNode;
	title: string; 
	toggleOpen: (val: string) => void, activeSection: string;
}

export function Section (
	{ children, title, toggleOpen, activeSection }: SectionProps) 
{
	const open = activeSection === title
	
	function handleOpen() {
		toggleOpen(title)
	}

	return (
		<div 
			onClick={handleOpen}
			className={cn(['w-full rounded-2xl transition-[max-height] duration-700 ease-in-out flex flex-col justify-center px-4 pb-4'])}
		>	
			<div className='h-[40px] w-full flex justify-between sticky top-0 bg-red-50 py-2'>
				<Text variant='title'>{title}</Text>

				<Icon type='pencil' size={20} fill='transparent' />
			</div>
			
			<div className='flex flex-col space-y-[8px]'>
				{children}
			</div>
		</div>		
	)
}