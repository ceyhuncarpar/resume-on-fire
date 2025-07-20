import { useState } from 'react'
import { Section } from './section'
import { Education, PersonalInformation, Summary, Experience, Skills } from './sections'
import { IconName } from 'lucide-react/dynamic'
import { cn } from '@/lib/utils'

const sections: { title: string, icon?: IconName, Component: React.FC }[] = [
	{ title: 'Personal information', icon: 'user', Component: PersonalInformation },
	{ title: 'Professional summary', icon: 'book-text', Component: Summary },
	{ title: 'Education', icon: 'graduation-cap', Component: Education },
	{ title: 'Work experience', icon: 'briefcase-business', Component: Experience },
	{ title: 'Skills', icon: 'lightbulb', Component: Skills }
]

export function Builder() {
	const [activeSection, setActiveSection] = useState<string>('Personal information')
	
	return (
		<div className={cn(
			'p-4 bg-red-50 flex flex-col space-y-6 mb-10',
			'md:flex-1 md:p-6 md:mb-0'
		)}>
			{sections.map((section) => (
				<Section 
					key={section.title}
					activeSection={activeSection}
					toggleOpen={setActiveSection}
					{...section}
				>
					<section.Component />
				</Section>
			))}
		</div>
	)
}