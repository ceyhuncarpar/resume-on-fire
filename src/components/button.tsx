import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Text } from './text'

const button = cva('rounded-md cursor-pointer', {
  variants: {
    variant: {
      primary: 'border border-transparent bg-green-600 text-white',
      secondary: 'border border-black',
    },
    size: {
      medium: 'px-4 h-[32px] md:px-8 md:h-[44px]'
    },
		disabled: {
			false: null,
			true: 'opacity-[0] cursor-not-allowed'
		}
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  text: string;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  text,
  ...rest
}) => (
  <button className={cn(button({ variant, size, className }))} {...rest}>
    <Text variant='subTitle'>{text}</Text>
  </button>
);