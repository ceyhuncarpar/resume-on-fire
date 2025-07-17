import { cn } from '@/lib/utils'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { ReactNode } from 'react'

export interface IconProps {
	type: IconName;
	size?: number;
	color?: string;
	margin?: string;
	fill?: string;
}

export function Icon({ type, size = 24, color = '#000', margin, fill }: IconProps): ReactNode {
	return (
		<DynamicIcon 
			name={type} 
			color={color} 
			size={size} 
			className={cn(margin && `margin-[${margin}]`)}
			fill={fill || 'transparent'}
		/>
	)
}