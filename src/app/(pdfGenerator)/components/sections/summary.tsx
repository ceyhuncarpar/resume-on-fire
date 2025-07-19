import React from 'react'
import { TextArea } from '@/components/textArea'
import { useResumeBuilder } from '../../provider'

export default function Summary() {
	const { updateGeneric, summary } = useResumeBuilder()

	return (
		<React.Fragment>
			<TextArea
				value={summary}
				placeholder='Type your professional summary here...'
				onChange={e => updateGeneric('summary', e.target.value)}
			/>
		</React.Fragment>
	)
}