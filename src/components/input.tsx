import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { Text } from './text';

const input = cva(
  'rounded-sm border bg-[#fafafa] py-2 px-2 outline-black text-[14px]',
  {
    variants: {
      variant: {
        primary: '',
      },
      defaultVariants: {
        variant: 'primary',
      },
    },
  }
)

export interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof input> {
  className?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'primary', className, label, ...rest }, ref) => {
    return (
      <div className={cn('w-full', className )}>
        {label && <Text variant='label' className='mb-[2px]'>{label}</Text>}
        <input
          ref={ref}
          className={cn(input(), 'w-full')}
          {...rest}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'