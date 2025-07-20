import { Input } from '@/components/input'
import { useResumeBuilder } from '../../provider'
import React, { useState } from 'react'
import { PersonalInfo } from '@/types/resume'


// TODO: ADD MORE DYNAMIC FIELDS, SUCH AS WEBSITE
export default function PersonalInformation() {
	const { updateGeneric, updateArrayItem, name, personalInfo } = useResumeBuilder()
	const rData = useResumeBuilder()

	return (
		<React.Fragment>
			<Input 
				label='Full name'
				placeholder='Type here...'
				value={name}
				onChange={(e) => updateGeneric('name', e.target.value)} 
			/>
			
			<div className='flex flex-wrap justify-between gap-4'>
				{personalInfo.map((data, i) => {
					return (
						<Input
							className='w-[calc(50%-0.5rem)]'
							key={i}
							label={data.label}
							value={rData.personalInfo[i]?.value}
							placeholder='Type here...' 
							onChange={(e) => updateArrayItem('personalInfo', i, { value: e.target.value } )} 
						/>
					)
				})}
			</div>
		</React.Fragment>
	)
}