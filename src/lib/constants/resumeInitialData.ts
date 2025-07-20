import { type Resume } from '@/types/resume'

export const resumeInitialData: Resume = {
	name: '',
	summary: '',
	personalInfo: [
		{ label: 'Phone number', value: '' },
		{ label: 'Email address', value: '' },
		{ label: 'LinkedIn', value: '' },
		{ label: 'GitHub', value: '' },
	],
	education: [{
		school: '',
		location: '',
		field: '',
		degree: '',
		degreeAbbr: '',
		gradMonth: undefined,
		gradYear: undefined,
		selectedDegree: undefined
	}],
	experience: [{
		company: '',
		title: '',
		workedBetween: '',
		location: '',
		type: '',
		achievements: [''],
	}],
	skills: [{ label: '', value: '' }],
}