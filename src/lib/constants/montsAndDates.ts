import { DropdownOptionProps } from '@/components/dropdown'

export interface MonthProps extends DropdownOptionProps {
  abbr?: string;
}

export const months: MonthProps[] = [
  { value: 'January', label: 'January', abbr: 'Jan' },
  { value: 'February', label: 'February', abbr: 'Feb' },
  { value: 'March', label: 'March', abbr: 'Mar' },
  { value: 'April', label: 'April', abbr: 'Apr' },
  { value: 'May', label: 'May', abbr: 'May' },
  { value: 'June', label: 'June', abbr: 'Jun' },
  { value: 'July', label: 'July', abbr: 'Jul' },
  { value: 'August', label: 'August', abbr: 'Aug' },
  { value: 'September', label: 'September', abbr: 'Sep' },
  { value: 'October', label: 'October', abbr: 'Oct' },
  { value: 'November', label: 'November', abbr: 'Nov' },
  { value: 'December', label: 'December', abbr: 'Dec' }
]