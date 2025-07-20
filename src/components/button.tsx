import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Text } from './text'
import { IconName } from 'lucide-react/dynamic'
import { Icon } from './icon'

const button = cva(
  'rounded-sm cursor-pointer flex items-center justify-center gap-2', 
  {
    variants: {
      variant: {
        primary: 'border bg-green-600 text-white',
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
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  text: string
  icon?: IconName
	disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  icon,
  text,
  ...rest
}) => (
  <button className={cn(button({ variant, size, className }))} {...rest}>
    {icon && <Icon type={icon} size={20} color={variant === 'secondary' ? '#000' : '#fffs'} />}
    <Text variant='subTitle'>{text}</Text>
  </button>
);