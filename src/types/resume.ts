export type PersonalInfo = { type: 'text' | 'link' | string, value: string }

export type Resume = {
	name: string
	summary: string
	personalInfo: {
		phone: PersonalInfo
		email: PersonalInfo
		linkedin: PersonalInfo
		github: PersonalInfo
	},
}