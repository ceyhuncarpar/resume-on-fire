import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Icon } from './icon'
import { type IconName } from 'lucide-react/dynamic'

const iconButton = cva('rounded-md cursor-pointer', {
	variants: {
		variant: {
			primary: 'border border-gray-400 flex justify-center items-center',
			secondary: 'flex justify-center items-center'
		},
		size: {
			medium: 'h-[32px] w-[32px] md:h-[44px] md:w-[44px]',
			small: 'h-[24px] w-[24px] md:h-[24px] md:w-[24px]'
		},
		disabled: {
			false: null,
			true: 'opacity-[0] cursor-not-allowed'
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'medium',
	},
})

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof iconButton> {
	iconType: IconName;
	iconColor?: string;
	disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
	className,
	variant = 'primary',
	size = 'medium',
	iconType,
	iconColor,
	...rest
}) => (
	<button className={cn(iconButton({ variant, size, className }))} {...rest}>
		<Icon type={iconType} color={iconColor} size={20} />
	</button>
);