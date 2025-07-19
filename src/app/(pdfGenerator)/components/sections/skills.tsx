import { Input } from '@/components/input'
import { useResumeBuilder } from '../../provider'
import React, { useState } from 'react'
import { Skill } from '@/types/resume'
import { Button } from '@/components/button'

const initialFields = [
	{ label: '', value: '' },
]

// TODO: ADD MORE DYNAMIC FIELDS, SUCH AS WEBSITE
export default function Skills() {
	const [fields, setFields] = useState<Skill[]>(initialFields)
	const { addSkill, updateArrayItem, skills } = useResumeBuilder()

	return (
		<React.Fragment>		
			{skills.map((data, i) => {
				return (
					<div className='flex gap-4' key={i}>
						<Input
							value={data.label}
							className='w-[33%]'
							key={i}
							placeholder='Specialty' 
							onChange={(e) => updateArrayItem('skills', i, { label: e.target.value } )} 
						/>
						
						<Input
							value={data.value}
							placeholder='Your skills' 
							onChange={(e) => updateArrayItem('skills', i, { value: e.target.value } )} 
						/>
					</div>
				)
			})}

			<Button 
				text='Add skill'
				onClick={addSkill}
			/>
		</React.Fragment>
	)
}