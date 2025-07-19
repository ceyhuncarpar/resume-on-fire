'use client'

import { type Skill, type EducationInfo, type ExperienceInfo, type Resume } from '@/types/resume'
import { createContext, useState, useMemo, useCallback, useContext, type ReactNode, useRef } from 'react'
import { PDFGenerator } from '@/services/pdfGenerator'

export interface IResumeBuilderContext extends Resume {
	updateGeneric: <K extends keyof Resume>(key: K, value: Resume[K]) => void
	updateArrayItem: (key: 'education' | 'experience' | 'skills', index: number, data: Partial<EducationInfo | ExperienceInfo | Skill>) => void
	addEducation: () => void
	addExperience: () => void
	addSkill: () => void
	generate: () => void
}

const ResumeBuilderContext = 
	createContext<IResumeBuilderContext | undefined>(undefined)

export function ResumeBuilderProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<Resume>({
		name: '',
		summary: '',
		personalInfo: [],
		education: [],
		experience: [],
		skills: []
	})
	const builder = useRef(new PDFGenerator())

	const updateGeneric = useCallback(
		<K extends keyof Resume>(key: K, value: Resume[K]) => {
			setData(data => ({ ...data, [key]: value }))
		}, 
		[]
	)

	const updateArrayItem = useCallback(
		(key: 'education' | 'experience' | 'skills', index: number, data: Partial<ExperienceInfo | EducationInfo |Skill>) => {
			setData(doc => ({
				...doc,
				[key]: doc[key].map((val, i) => {
					if(i !== index) return val

					return { ...val, ...data }
				})
			}))
		}, 
		[]
	)

	const addEducation = useCallback(() => {
		setData(data => ({
			...data,
			education: [
				...data.education,
				{
					school: '',
					location: '',
					field: '',
					degree: '',
					degreeAbbr: '',
					gradDate: '',
				}
			]
		}))
	}, [])

	const addExperience = useCallback(() => {
		setData(data => ({
			...data,
			experience: [
				...data.experience,
				{
					company: '',
					title: '',
					workedBetween: '',
					location: '',
					type: '',
					achievements: [''],
				}
			]
		}))
	}, [])

	const addSkill = useCallback(() => {
		setData(data => ({
			...data,
			skills: [...data.skills, { label: '', value: '' }]
		}))
	}, [])

	const generate = useCallback(() => {
		builder.current.generate({
			name: data.name,
			personalInfo: data.personalInfo,
			summary: data.summary,
			education: data.education.map(edu => ({
				...edu,
				gradDate: `${edu.gradMonth ? edu.gradMonth.abbr + ' ' : '' }${edu.gradYear?.value}`
			})),
			experience: data.experience.map(exp => ({
				...exp,
				workedBetween: `${exp.startMonth ? exp.startMonth.abbr + ' ' : '' }${exp.startYear?.value} - ${exp.endMonth ? exp.endMonth.abbr + ' ' : '' }${exp.endYear?.value}`
			})),
			skills: data.skills
		})
	}, [data])

	// TODO: DECIDE ON HOW TO HANDLE MEMOIZATION AND THE DEPENDENCY ARRAY HERE
	const values: IResumeBuilderContext = useMemo(() => {
		return { 
			updateGeneric, 
			updateArrayItem,
			addEducation,
			addExperience,
			generate,
			addSkill,
			...data 
		}
	}, [updateGeneric, generate, data])

	return (
		<ResumeBuilderContext.Provider value={values}>
			{children}
		</ResumeBuilderContext.Provider>
	)
}


export function useResumeBuilder() {
  const context = useContext(ResumeBuilderContext)
  if(context === undefined) {
    throw new Error('useResumeBuilder must be used within a UserProvider')
  }
  return context
}
