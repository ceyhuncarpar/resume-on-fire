import React, { useMemo } from 'react'
import { Button } from '@/components/button'
import { useResumeBuilder } from '../../provider'
import { Text } from '@/components/text'
import { Input } from '@/components/input'
import { Dropdown } from '@/components/dropdown'
import { MonthProps, months } from '@/lib/constants/montsAndDates'
import { IconButton } from '@/components/iconButton'
import { AddFieldButton } from '../addFieldButton'
import { Icon } from '@/components/icon'
import { AddSectionButton } from '../addSectionButton'
import { cn } from '@/lib/utils'

export default function Experience() {
	const { addExperience, updateArrayItem, deleteArrayItem, experience } = useResumeBuilder()
	const yearOptions = useMemo(() => {
		const start = 1950
		const end = 2025
		let arr = []
		for(let i = start; i <= end; i++) {
			arr.unshift({ value: i.toString(), label: i.toString() })
		}

		return arr
	}, [])

	function addAchievement(index: number) {
		updateArrayItem(
			'experience', 
			index, 
			{ achievements: [...experience[index].achievements, ''] }
		)
	}

	function updateAchievement(index: number, valueI: number, value: string) {
		updateArrayItem(
			'experience',
			index,
			{ 
				achievements: experience[index].achievements.map((val, i) => {
					if(valueI !== i) return val

					return value
				})
			}
		)
	}

	function deleteAchievement(index: number, valueI: number) {
		updateArrayItem(
			'experience',
			index,
			{ 
				achievements: experience[index].achievements.filter((_, i) => i !== valueI)
			}
		)
	}

	return (
		<React.Fragment>
			<div className='space-y-4'>
				{experience.map((exp, i) => (
					<div key={i} className='space-y-4'>
						<div className={cn(
							'flex items-center justify-between gap-2',
							i !== 0 ? 'mt-8' : ''
						)}>
							<Text variant='subTitle'>
								Experience {i+1}
							</Text>

							<IconButton 
								variant='secondary'
								size='small'
								iconType='trash'
								onClick={() => deleteArrayItem('experience', i)}
							/>
						</div>

						<Input 
							label='Company'
							value={exp.company}
							placeholder="Where did you work?"
							onChange={e => updateArrayItem('experience', i, { company: e.target.value })}
						/>

						<Input 
							label='Title'
							value={exp.title}
							placeholder="What was your title?"
							onChange={e => updateArrayItem('experience', i, { title: e.target.value })}
						/>

						<Input 
							label='Location'
							value={exp.location}
							placeholder="Where is the location?"
							onChange={e => updateArrayItem('experience', i, { location: e.target.value })}
						/>

						<div className='w-full flex flex-col space-y-2'>
							<Text variant='label'>Key achievements</Text>

							{exp.achievements.map((value, i2) => (
								<div key={i2} className='flex flex-1 w-[100%] items-center gap-2'> 
									<div className='h-2 w-2 bg-black' />
									
									<Input
										placeholder='Please explain what you did.'
										value={value}
										onChange={(e) => updateAchievement(i, i2, e.target.value)}
									/>

									<IconButton 
										variant='secondary'
										size='small'
										iconType='trash'
										onClick={() => deleteAchievement(i, i2)}
									/>
								</div>
							))}

							<AddFieldButton 
								text='Add achievement'
								onAdd={() => addAchievement(i)}
							/>

							<div className='flex gap-4'>
								<div className='flex-col flex-1'>
									<Text variant='label'>Start date</Text>

									<div className='gap-2 flex flex-1 w-full'>
										<Dropdown
											options={months}
											selected={experience[i].startMonth}
											onChange={(data: MonthProps) => updateArrayItem('experience', i, { startMonth: data })}
										/>

										<Dropdown 
											options={yearOptions}
											selected={experience[i].startYear}
											onChange={data => updateArrayItem('experience', i, { startYear: data })}
										/>
									</div>
								</div>

								<div className='flex-col flex-1'>
									<Text variant='label'>End date</Text>

									<div className='gap-2 flex flex-1 w-full'>
										<Dropdown
											options={months}
											selected={experience[i].endMonth}
											onChange={(data: MonthProps) => updateArrayItem('experience', i, { endMonth: data })}
										/>

										<Dropdown 
											options={yearOptions}
											selected={experience[i].endYear}
											onChange={data => updateArrayItem('experience', i, { endYear: data })}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<AddSectionButton 
				className={!experience.length ? 'mt-[-32px]' : ''}
				text='Add experience'
				onAdd={addExperience}
			/>
		</React.Fragment>
	)
}
