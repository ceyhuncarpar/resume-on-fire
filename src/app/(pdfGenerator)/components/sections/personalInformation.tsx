import { Input } from '@/components/input'
import { useResumeBuilder } from '../../provider'

export default function PersonalInformation() {
	const { updateGeneric, updatePersonalInfo } = useResumeBuilder()

	return (
		<div className='flex flex-col space-y-[8px] px-[16px] py-[8px]'>
			<Input 
				label='Full name'
				placeholder='Type here...' 
				onChange={(e) => updateGeneric('name', e.target.value)} 
			/>
			<Input 
				label='Phone number'
				placeholder='Type here...' 
				onChange={(e) => updatePersonalInfo('phone', e.target.value)} 
			/>
			<Input 
				label='Email address'
				placeholder='Type here...' 
				onChange={(e) => updatePersonalInfo('email', e.target.value)} 
			/>
			<Input 
				label='LinkedIn'
				placeholder='Type here...'
				onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} 
			/>
			<Input 
				label='GitHub'
				placeholder='Type here...' 
				onChange={(e) => updatePersonalInfo('github', e.target.value)} 
			/>
		</div>
	)
}