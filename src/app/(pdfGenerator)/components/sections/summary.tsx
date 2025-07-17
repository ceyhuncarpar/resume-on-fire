import { TextArea } from '@/components/textArea'
import { useResumeBuilder } from '../../provider'

export default function Summary() {
	const { updateGeneric } = useResumeBuilder()

	return (
		<div className='flex flex-col space-y-[8px] px-[16px] py-[8px]'>
			<TextArea 
				placeholder='Type your professional summary here...'
				onChange={e => updateGeneric('summary', e.target.value)}
			/>
		</div>
	)
}