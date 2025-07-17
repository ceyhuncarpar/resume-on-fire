'use client'

import { type PersonalInfo, type Resume } from '@/types/resume'
import { createContext, useState, useMemo, useCallback, useContext, type ReactNode, useRef } from 'react'
import { PDFGenerator } from '@/services/pdfGenerator'

export interface IResumeBuilderContext extends Resume {
	updateGeneric: <K extends keyof Resume>(key: K, value: Resume[K]) => void;
	updatePersonalInfo: (key: string, value: string) => void;
	generate: () => void;
}

const ResumeBuilderContext = createContext<IResumeBuilderContext | undefined>(undefined)

export function ResumeBuilderProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<Resume>({
		name: '',
		summary: '',
		personalInfo: {
			phone: { type: 'text', value: '' },
			email: { type: 'link', value: '' },
			linkedin: { type: 'link', value: '' },
			github: { type: 'link', value: '' }
		}
	})
	const builder = useRef(new PDFGenerator())

	const updateGeneric = useCallback(<K extends keyof Resume>(key: K, value: Resume[K]) => {
		setData(data => ({ ...data, [key]: value }))
	}, [])

	const updatePersonalInfo = useCallback((key: string, value: string) => {
		setData(data => ({
			...data,
			personalInfo: { 
				...data.personalInfo, 
				[key]: { type: key === 'phone' ? 'text' : 'link', value } 
			}
		}))
	}, [])

	const generate = useCallback(() => {
		builder.current.generate({
			name: data.name,
			personalInfo: data.personalInfo,
			summary: data.summary
		})
	}, [data])

	const values: IResumeBuilderContext = useMemo(() => {
		return { updateGeneric, updatePersonalInfo, generate, ...data }
	}, [updateGeneric, updatePersonalInfo, generate, data])

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
