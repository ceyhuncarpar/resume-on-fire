import { useState } from 'react'
import { Section } from './section'
import { Education, PersonalInformation, Summary, Experience, Skills } from './sections'
import { Button } from '@/components/button'
import { useResumeBuilder } from '../provider'

export function Builder() {
	const [activeSection, setActiveSection] = useState<string>('Personal information')
	const { generate } = useResumeBuilder()
	
	return (
		<div className='w-[50%] h-full p-6 bg-red-50 flex flex-col space-y-2'>
			<div className='w-full max-h-full border-b-cyan-600 border-2 rounded-2xl'>
				<Section 
					title='Personal information'
					activeSection={activeSection}
					toggleOpen={setActiveSection}
				>
					<PersonalInformation />
				</Section>

				<Section 
					title='Professional summary'
					activeSection={activeSection}
					toggleOpen={setActiveSection}
				>
					<Summary />
				</Section>

				<Section 
					title='Education'
					activeSection={activeSection}
					toggleOpen={setActiveSection}
				>
					<Education />
				</Section>

				<Section 
					title='Work experience'
					activeSection={activeSection}
					toggleOpen={setActiveSection}
				>
					<Experience />
				</Section>

				<Section 
					title='Skills'
					activeSection={activeSection}
					toggleOpen={setActiveSection}
				>
					<Skills />
				</Section>
			</div>

			<Button 
				className='sticky bottom-6'
				text='Generate'
				onClick={generate}
			/>
		</div>
	)
}