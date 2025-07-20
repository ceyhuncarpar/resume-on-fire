import { Icon } from '@/components/icon'
import { Text } from '@/components/text'
import React from 'react'

export function AddFieldButton({ onAdd, text }: { onAdd: () => void, text: string }) {
	return (
		<button 
			className='cursor-pointer w-full flex items-center space-x-2 py-2'
			onClick={onAdd}
		>
			<Icon type='plus' size={16} fill='currentColor' />
			<Text variant='label'>{text}</Text>
		</button>
	)
}
