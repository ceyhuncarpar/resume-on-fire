import React, { useMemo } from 'react'
import { useResumeBuilder } from '../../provider'
import { Input } from '@/components/input'
import { Dropdown } from '@/components/dropdown'
import { Text } from '@/components/text'
import { graduationTypes } from '@/lib/constants/graduationTypes'
import { GraduationTypeProps } from '@/types/resume'
import { type MonthProps, months } from '@/lib/constants/montsAndDates'
import { IconButton } from '@/components/iconButton'
import { AddSectionButton } from '../addSectionButton'
import { cn } from '@/lib/utils'

export default function Education() {
	const { addEducation, updateArrayItem, deleteArrayItem, education } = useResumeBuilder()
	const yearOptions = useMemo(() => {
		const start = 1950
		const end = 2030
		const arr = []
		for(let i = start; i <= end; i++) {
			arr.unshift({ value: i.toString(), label: i.toString() })
		}

		return arr
	}, [])

	return (
		<React.Fragment>
			<div className='space-y-4'>
				{education.map((edu, i) => (
					<div key={i} className='space-y-4'>
						<div className={cn(
							'flex items-center justify-between gap-2',
							i !== 0 ? 'mt-8' : ''
						)}>
							<Text variant='subTitle'>
								Education {i+1}
							</Text>

							<IconButton 
								variant='secondary'
								size='small'
								iconType='trash'
								onClick={() => deleteArrayItem('education', i)}
							/>
						</div>

						<Input 
							label='School'
							value={edu.school || ''}
							placeholder='From where did you graduate?'
							onChange={e => updateArrayItem('education', i, { school: e.target.value })}
						/>

						<Input 
							label='Location'
							value={edu.location}
							placeholder="Where is your school or campus located?"
							onChange={e => updateArrayItem('education', i, { location: e.target.value })}
						/>

						<Dropdown 
							label='Graduation'
							selected={education[i].selectedDegree}
							options={graduationTypes}
							onChange={(data: GraduationTypeProps) => {
								updateArrayItem('education', i, { 
									selectedDegree: data, 
									degree: data.value, 
									degreeAbbr: data.degreeAbbr 
								})
							}}
						/>

						<Input 
							label='Field of study'
							value={edu.field}
							placeholder="What is your field of study?"
							onChange={e => updateArrayItem('education', i, { field: e.target.value })}
						/>
						
						<div className='w-full'>
							<Text variant='label'>Graduation date</Text>

							<div className='gap-4 flex w-full'>
								<Dropdown
									placeholder='Month'
									options={months}
									selected={education[i].gradMonth}
									onChange={(data: MonthProps) => updateArrayItem('education', i, { gradMonth: data })}
								/>
								<Dropdown  
									placeholder='Year'
									options={yearOptions}
									selected={education[i].gradYear}
									onChange={(data: MonthProps) => updateArrayItem('education', i, { gradYear: data })}
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<AddSectionButton
				className={!education.length ? 'mt-[-32px]' : ''}
				text='Add education'
				onAdd={addEducation}
			/>
		</React.Fragment>
	)
}