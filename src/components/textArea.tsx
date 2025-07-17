import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import { Text } from './text'

const textarea = cva(
  'rounded-md border bg-[#fafafa] py-2 px-2 outline-black text-[14px] min-h-[120px] max-h-[480px]',
  {
    variants: {
      variant: {
        primary: 'w-full',
        fill: 'w-full',
      },
      defaultVariants: {
        variant: 'fill',
      },
    },
  }
)

interface TextAreaProps
  extends React.ComponentProps<'textarea'>,
    VariantProps<typeof textarea> {
  className?: string;
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant = 'fill', label, className, ...rest }, ref) => {
    return (
      <div>
        {label && <Text variant='label' className='mb-[2px]'>{label}</Text>}
        <textarea
          ref={ref}
          className={cn(textarea({ variant, className }))}
          {...rest}
        />
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'