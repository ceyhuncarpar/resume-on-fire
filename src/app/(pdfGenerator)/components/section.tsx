import { Icon } from '@/components/icon'
import { Text } from '@/components/text';
import { cn } from '@/lib/utils'
import React, { ReactNode, useState } from 'react'
import { AddSectionButton } from './addSectionButton';
import { useResumeBuilder } from '../provider';
import { IconName } from 'lucide-react/dynamic';

interface SectionProps {
	children: ReactNode;
	title: string; 
	toggleOpen: (val: string) => void, activeSection: string;
	icon?: IconName;
}

export function Section (
	{ children, title, toggleOpen, icon }: SectionProps) 
{
	function handleOpen() {
		toggleOpen(title)
	}
	
	return (
		<div 
			onClick={handleOpen}
			className={'w-full rounded-xl transition-[max-height] flex flex-col justify-center px-4 pb-4 pt-2 border-1'}
		>	
			<div className='w-full items-center flex gap-2 sticky top-0 bg-red-50 py-2 mb-4'>
				<Icon type={icon || 'pencil'} size={20} fill='transparent' />
				<Text variant='title'>{title}</Text>
				
			</div>
			
			<div className='flex flex-col space-y-4'>
				{children}
			</div>
		</div>		
	)
}