import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react';

const text = cva(
	'',
	{
		variants: {
			variant: {
				label: 'font-semibold text-[14px]',
				primary: 'text-[14px]',
				subTitle: 'font-medium text-[16px]',
				title: 'font-medium text-[18px]',
				
			},
		},
	}
)

export interface InputProps
	extends React.ComponentProps<'p'>,
		VariantProps<typeof text> {
	className?: string;
	children: ReactNode;
}

export const Text = 
({ variant = 'primary', className, children, ...rest }: InputProps) => {
	return (
		<p
			className={cn(text({ variant, className }))}
			{...rest}
		>
			{children}
		</p>
	)
}


Text.displayName = 'Text'