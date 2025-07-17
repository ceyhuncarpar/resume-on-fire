import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const button = cva('rounded-md h-8', {
  variants: {
    variant: {
      primary: 'border border-transparent bg-green-600 text-white cursor-pointer',
      secondary: 'border border-black',
    },
    size: {
      medium: 'px-4 h-[32px] md:px-8 md:h-[44px]',
      large: 'px-4 h-[42px] md:px-8 md:h-[52px]',
    },
		disabled: {
			false: null,
			true: 'opacity-[0] cursor-not-allowed'
		},
		full: {
			false: null,
			true: 'w-full'
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
  ...props
}) => (
  <button className={cn(button({ variant, size, className }))} {...props}>
    <p className="font-semibold text-[16px] md:text-[20px]">{text}</p>
  </button>
);