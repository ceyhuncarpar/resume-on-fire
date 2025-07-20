'use client'

import { type Skill, type EducationInfo, type ExperienceInfo, type Resume } from '@/types/resume'
import { createContext, useState, useMemo, useCallback, useContext, type ReactNode, useRef, useEffect } from 'react'
import { PDFGenerator } from '@/services/pdfGenerator'
import { resumeInitialData } from '@/lib/constants/resumeInitialData'
import { builderMobileBreakpoint } from '@/lib/constants/values'

export interface IResumeBuilderContext extends Resume {
	updateGeneric: <K extends keyof Resume>(key: K, value: Resume[K]) => void
	updateArrayItem: (key: 'education' | 'experience' | 'skills' | 'personalInfo', index: number, data: Partial<EducationInfo | ExperienceInfo | Skill>) => void
	deleteArrayItem: (key: 'education' | 'experience' | 'skills', index: number) => void
	addEducation: () => void
	addExperience: () => void
	addSkill: () => void
	generate: () => void
	documentURL: string
}

const ResumeBuilderContext = 
	createContext<IResumeBuilderContext | undefined>(undefined)

const initialData = {
		name: '',
		summary: '',
		personalInfo: [
			{ label: 'Phone number', value: '' },
			{ label: 'Email address', value: '' },
			{ label: 'LinkedIn', value: '' },
			{ label: 'GitHub', value: '' }
		],
		education: [],
		experience: [],
		skills: []
	}

export function ResumeBuilderProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<Resume>(initialData)
	const [updatedOnce, setUpdatedOnce] = useState<boolean>(false)
	const [documentURL, setDocumentURL] = useState<string>('')
	const builder = useRef(new PDFGenerator())
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		console.log('---------------------------------------------------------------------------------')
		console.log('pers info', data.personalInfo)
		console.log('---------------------------------------------------------------------------------')
		autoGenerate()
	}, [data])

	function autoGenerate() {
		if(initialData === data || !updatedOnce) {
			setUpdatedOnce(true)
			return
		}
		timeoutRef.current && clearTimeout(timeoutRef.current)
		timeoutRef.current = setTimeout(() => {
			generate()
		}, 1500)
	}

	const updateGeneric = useCallback(
		<K extends keyof Resume>(key: K, value: Resume[K]) => {
			setData(data => ({ ...data, [key]: value }))
		}, 
		[]
	)

	const updateArrayItem = useCallback(
		(key: 'education' | 'experience' | 'skills' | 'personalInfo', index: number, data: Partial<ExperienceInfo | EducationInfo |Skill>) => {
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

	const deleteArrayItem = useCallback((key: 'education' | 'experience' | 'skills', index: number) => {
		setData(data => ({
			...data,
			[key]: data[key].filter((_, i) => i !== index)
		}))
	}, [])

	const addEducation = useCallback(() => {
		setData(data => ({
			...data,
			education: [
				...data.education,
				resumeInitialData.education[0]
			]
		}))
	}, [])

	const addExperience = useCallback(() => {
		setData(data => ({
			...data,
			experience: [
				...data.experience,
				resumeInitialData.experience[0]
			]
		}))
	}, [])

	const addSkill = useCallback(() => {
		setData(data => ({
			...data,
			skills: [...data.skills, resumeInitialData.skills[0]]
		}))
	}, [])

	const generate = useCallback(async () => {
		const document = await builder.current.generate({
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

		setDocumentURL(document!)
		const isMobile = window.innerWidth <= builderMobileBreakpoint
		const elem = window.document.getElementById(isMobile ? 'resume-preview' : 'resume-preview-desktop') as HTMLIFrameElement
		if(elem) elem.src = document!
	}, [data])

	// TODO: DECIDE ON HOW TO HANDLE MEMOIZATION AND THE DEPENDENCY ARRAY HERE
	const values: IResumeBuilderContext = useMemo(() => {
		return { 
			updateGeneric, 
			updateArrayItem,
			deleteArrayItem,
			addEducation,
			addExperience,
			generate,
			addSkill,
			documentURL,
			...data 
		}
	}, [documentURL, generate, data])

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
