import { type DropdownOptionProps } from '@/components/dropdown'
import { type MonthProps } from '@/lib/constants/montsAndDates'

export type PersonalInfo = { label: string, value: string }
export type GraduationTypeProps = DropdownOptionProps & {
	degreeAbbr?: string
}
export type ExperienceInfo = {
	// TODO: RENAME TO EMPLOYER
	company: string
	title: string
	location: string
	type: string
	achievements: string[]
	startMonth?: MonthProps
	endMonth?: MonthProps
	startYear?: DropdownOptionProps
	endYear?: DropdownOptionProps
	workedBetween?: string
}
export type EducationInfo = {
	school: string
	location: string
	field: string
	degree: string
	degreeAbbr: string
	gradMonth?: MonthProps
	gradYear?: DropdownOptionProps
	selectedDegree?: GraduationTypeProps
}
export type Skill = { label: string, value: string }

export type Resume = {
	name: string
	summary: string
	personalInfo: PersonalInfo[],
	education: EducationInfo[]
	experience: ExperienceInfo[]
	skills: Skill[]
}