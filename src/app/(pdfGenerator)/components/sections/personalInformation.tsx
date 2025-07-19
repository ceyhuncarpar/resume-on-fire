import { Input } from '@/components/input'
import { useResumeBuilder } from '../../provider'
import React, { useState } from 'react'
import { PersonalInfo } from '@/types/resume'

const initialFields = [
	{ label: 'Phone number', value: '' },
	{ label: 'Email address', value: '' },
	{ label: 'LinkedIn', value: '' },
	{ label: 'GitHub', value: '' }
]

// TODO: ADD MORE DYNAMIC FIELDS, SUCH AS WEBSITE
export default function PersonalInformation() {
	const [fields, setFields] = useState<PersonalInfo[]>(initialFields)
	const { updateGeneric, updateArrayItem, name } = useResumeBuilder()
	const rData = useResumeBuilder()

	return (
		<React.Fragment>
			<Input 
				label='Full name'
				placeholder='Type here...'
				value={name}
				onChange={(e) => updateGeneric('name', e.target.value)} 
			/>
			
			{fields.map((data, i) => {
				return (
					<Input
						key={i}
						label={data.label}
						value={rData.personalInfo[i]?.value}
						placeholder='Type here...' 
						onChange={(e) => updateArrayItem('skills', i, { value: e.target.value } )} 
					/>
				)
			})}
		</React.Fragment>
	)
}