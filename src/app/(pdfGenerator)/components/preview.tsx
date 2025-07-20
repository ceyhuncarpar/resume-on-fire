import { cn } from '@/lib/utils'

export function Preview() {
	return (
		<div className={cn([
			'h-[100vh] bg-red-50 hidden',
			'md:flex md:w-[50%] md:display-auto sticky top-0'
		])}>
			<iframe
				id='resume-preview-desktop'
				width='100%'
				height='100%'
			/>
		</div>
	)
}