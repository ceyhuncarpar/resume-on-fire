import React, { useState, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Icon } from './icon'
import { useClickOutside } from '@/lib/hooks/useClickOutside'
import { Text } from './text'

export type DropdownOptionProps = {
	value: string; 
	label: string;
}

export interface DropdownProps extends VariantProps<typeof dropdown> {
  options: DropdownOptionProps[];
  selected?: DropdownOptionProps;
  onChange: (data: DropdownOptionProps) => void;
  disabled?: boolean;
	className?: string;
	placeholder?: string;
	label?: string;
}

const dropdown = cva(
	'bg-white rounded-md border py-2 px-2 outline-black text-[14px] cursor-pointer w-full m-0 flex', 
	{
		variants: {
			variant: {
				primary: ''
			},
			disabled: {
				false: null,
				true: 'opacity-50 cursor-not-allowed pointer-events-none',
			}
		},
		defaultVariants: {
			variant: 'primary'
		},
	}
)

const menu = cva(
  'w-full absolute z-10 mt-1 max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-green-600 text-white',
        secondary: 'bg-white text-black border border-gray-300',
      },
      size: {
        medium: 'text-sm',
        large: 'text-base',
      },
      full: {
        false: 'w-auto',
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
)

export const Dropdown: React.FC<DropdownProps> = ({
  variant,
  disabled = false,
  options,
  selected,
  onChange,
	placeholder,
  className,
	label,
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find(o => o.value === selected?.value)

  useClickOutside(containerRef, () => setOpen(false))

  const toggleOpen = () => {
    if (disabled) return
    setOpen(prev => !prev)
  }

  const handleSelect = (data: DropdownOptionProps) => {
    onChange(data)
    setOpen(false)
  }

  return (
    <div className='flex flex-col w-full' ref={containerRef}>
			{label && <Text variant='label'>{label}</Text>}
			<button
				type='button'
				onClick={toggleOpen}
				aria-haspopup='listbox'
				aria-expanded={open}
				disabled={disabled}
				className={cn(dropdown({ variant, disabled, className }))}
			>
				<div className='w-full relative'>
					<p className='text-start'>{selectedOption?.value || placeholder || 'Select...'}</p>

					<div className='flex h-full items-center justify-center absolute right-0 top-0'>
						<Icon
							type='chevron-down'
							size={20}
							fill='transparent'
							className={cn(
								'ml-2 transition-transform right-0 top-0', 
								{ 'rotate-180': open }
							)}
						/>
					</div>
				</div>
			</button>
			
			<div className='relative'>
				{open && (
					<ul
						role='listbox'
						tabIndex={-1}
						className={cn(menu({ variant }))}
						aria-labelledby='dropdown-label'
					>
						{options.map(option => (
							<li
								key={option.value}
								role='option'
								aria-selected={selected?.value === option.value}
								className={cn('cursor-pointer select-none px-4 py-2 hover:bg-green-700 hover:text-white')}
								onClick={() => handleSelect(option)}
							>
								{option.label}
							</li>
						))}
					</ul>
				)}
			</div>
    </div>
  )
}
