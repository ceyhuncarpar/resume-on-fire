import { Icon } from '@/components/icon'
import { cn } from '@/lib/utils'
import React, { useState, ReactNode, FC, SetStateAction } from 'react'

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
			className={cn([
				'w-full rounded-2xl transition-[max-height] duration-700 ease-in-out flex flex-col justify-center overflow-hidden',
				open ? 'max-h-[400px]' : 'max-h-[40px]',
			])}
		>	
			<div className='cursor-pointer -h-[40px] w-full flex flex-col justify-center top-0 px-4 sticky bg-red-50'>
				<div className='h-[40px] w-full flex flex-col justify-center'>
					<p className='font-semibold'>{title}</p>

					<div className='absolute right-4'>
						<Icon type='pencil' size={20} fill='transparent' />
					</div>
				</div>
			</div>
			
			{children}
		</div>		
	)
}