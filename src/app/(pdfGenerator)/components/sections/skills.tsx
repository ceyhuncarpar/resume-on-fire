import { Input } from '@/components/input'
import { useResumeBuilder } from '../../provider'
import React from 'react'
import { AddFieldButton } from '../addFieldButton'
import { Text } from '@/components/text'
import { IconButton } from '@/components/iconButton'
import { AddSectionButton } from '../addSectionButton'

const initialFields = [
	{ label: '', value: '' },
]

// TODO: ADD MORE DYNAMIC FIELDS, SUCH AS WEBSITE
export default function Skills() {
	const { addSkill, updateArrayItem, deleteArrayItem, skills } = useResumeBuilder()


	return (
		<React.Fragment>		
			<div className='space-y-4'>
				{!!skills.length && (
					<Text>Please explain your specialty under a title, and prefrably add your skills separated by a comma.</Text>
				)}

				{skills.map((data, i) => {
					return (
						<div className='flex gap-4 items-center' key={i}>
							<Input
								value={data.label}
								className='w-[40%]'
								key={i}
								placeholder='Specialty type...' 
								onChange={(e) => updateArrayItem('skills', i, { label: e.target.value } )} 
							/>
							
							<Input
								value={data.value}
								placeholder='Your skills in specialty...' 
								onChange={(e) => updateArrayItem('skills', i, { value: e.target.value } )} 
							/>

							<IconButton 
								variant='secondary'
								size='small'
								iconType='trash'
								onClick={() => deleteArrayItem('skills', i)}
							/>
						</div>
					)
				})}
			</div>

			<AddSectionButton 
				className={!skills.length ? 'mt-[-32px]' : ''}
				text='Add skill'
				onAdd={addSkill}
			/>
		</React.Fragment>
	)
}