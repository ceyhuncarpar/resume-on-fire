import { useResumeBuilder } from '../../provider'
import { Button } from '@/components/button'

export default function Education() {
	const { updateGeneric, updatePersonalInfo } = useResumeBuilder()

	return (
		<div className='flex flex-col space-y-[8px] px-[16px] py-[8px]'>
			<Button text='Click here' variant='primary' disabled />
		</div>
	)
}