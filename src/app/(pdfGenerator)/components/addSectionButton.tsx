import { Button } from '@/components/button'
import { cn } from '@/lib/utils'
import React from 'react'

export interface AddSectionButtonProps { 
	onAdd: () => void
	text: string 
	className?: string;
}

export function AddSectionButton({ onAdd, text, className }: AddSectionButtonProps) {
	return (
		<Button 
			className={cn('border-none', className)}
			text={text}
			variant='secondary'
			icon='plus'
			onClick={onAdd}
		/>
	)
}
