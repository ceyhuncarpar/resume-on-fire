'use client'

import PDFKit from '@react-pdf/pdfkit'
import blobStream from 'blob-stream'

/**
 * Initial PDF generation class.
 */
export class PDFGenerator {
	titleSize = 24
	subTitleSize = 10
	textSize = 9
	pdf = null
	margins = null
	pageW = null
	realW = null
	output = 'outputs/test.pdf'
	stream = null


	async initialize() {
		console.log('Initializing')
		this.pdf = new PDFKit({ size: 'A4', margins: { left: 24, right: 12, top: 24, bottom: 24 } })
		this.margins = this.pdf.page.margins
		this.pageW = this.pdf.page.width
		this.realW = this.pdf.page.width - this.margins.left - this.margins.right

		await Promise.all([
			this.loadAndRegisterdFont('Rubik-Bold.ttf'),
			this.loadAndRegisterdFont('Rubik-Medium.ttf'),
			this.loadAndRegisterdFont('Rubik-Regular.ttf'),
		])

		// this.pdf.pipe(fs.createWriteStream(this.output))
		this.stream = this.pdf.pipe(blobStream())
	}

	/**
	 * Main task initializer.
	 */
	async generate(documentData) {
		console.log('Generating document')
		// console.log('---------------------------------------------------------------------------------')
		// console.log('document data', documentData)
		// console.log('---------------------------------------------------------------------------------')
		await this.initialize()

		// Iterate over keys of data, and generate fire the right function.
		Object.keys(documentData).map(key => {
			const value = documentData[key]

			switch (key) {
				case 'name':
						this.insertTitle(value)		
					break

				case 'personalInfo':
						this.insertPersonalInfo(value)		
					break

				case 'education':
					this.insertEducation(value)
					break

				case 'summary':
						this.insertSummary(value)		
					break

				case 'experience':
					this.insertExperience(value)		
				break

				case 'skills':
					this.insertSkills(value)		
				break
			
				default:
					break
			}
		})

		this.writeAndCompleteDocument()
	}

	/**
	 * Download and register font to resume builder.
	 * @param {string} name 
	 */
	async loadAndRegisterdFont(name) {
		const res = await fetch(`/fonts/${name}`)
		const buffer = await res.arrayBuffer()
		this.pdf.registerFont(name, new Uint8Array(buffer))
	}

	/**
	 * Inserts the main title.
	 * @param {String} text 
	 */
	insertTitle(text) {
		if(!text) return

		console.log('Adding title')
		this.pdf.font('Rubik-Bold.ttf')
		this.pdf.fontSize(this.titleSize).text(text)
	}

	/**
	 * Inserts subtitle with a bottom decorative line.
	 * @param {String} text 
	 * @returns 
	 */
	insertSubTitle(text) {
		if(!text) return

		console.log('Adding subtitle')
		this.pdf.font('Rubik-Bold.ttf')
			.fontSize(11)
			.text(
				text,
				this.margins.left,
				this.pdf.y + 24
			)

		// Add the line.
		this.pdf
			.moveTo(this.margins.left, this.pdf.y + 4)
			.lineTo(this.realW, this.pdf.y + 4)
			.strokeColor('#000')
			.lineWidth(1)
			.stroke()
	}

	/**
	 * Creates a column with given text
	 * @param {String} text 
	 * @param {Number} topPos 
	 * @param {String} position 
	 */
	createColumnWithText(text, topPos, position) {
		const leftColW = this.realW * 0.75
		const rightColW = this.realW * 0.25

		if(position === 'right') {
			this.pdf.text(text, leftColW, topPos, { width: rightColW, align: 'right' })
		}

		if(position === 'left') {
			this.pdf.text(text, 24, topPos, { width: leftColW })
		}
	}

	/**
	 * Calculates and decides if a new page should be added after each
	 * work experience to prevent content clipping.
	 */
	shouldAddPage() {
		const topPos = this.pdf.page.height - 24 - this.pdf.y
		if(topPos < 100) this.pdf.addPage()
	}

	/**
	 * Inserts contact and social info.
	 * @param {} info 
	 */
	insertPersonalInfo(data) {
		const keys = Object.keys(data)
		if(!keys?.length) return

		console.log('Adding personal info')

		this.pdf.font('Rubik-Regular.ttf')
		this.pdf.fontSize(this.textSize)

		// Iterate over info keys and add continued text with dashes in between.
		keys.forEach((key, i) => {
			const value = data[key]
			const isLast = keys.length === i + 1
			if(!value) return

			this.pdf.text(
				value,
				this.pdf.x,
				// Add top margin from header
				i === 0 ? this.pdf.y + 4 : this.pdf.y,
				{ 
					continued: !isLast
				}
			)

			// Add dashes if the current value is not the last value
			if(!isLast) {
				this.pdf.text('  -  ', { continued: true })
			}
		})
	}

	/**
	 * Inserts summary with sub section title.
	 * @param {String} text 
	 */
	insertSummary(text) {
		this.insertSubTitle('SUMMARY')
		console.log('Adding summary')

		this.pdf
			.font('Rubik-Regular.ttf')
			.fontSize(this.textSize)
			.text(
				text, 
				this.margins.left, 
				this.pdf.y + 12, 
				{ align: 'justify', width: this.realW - 24}
			)
	}

	/**
	 * Inserts education fields.
	 * @param {Array} data 
	 */
	insertEducation(data) {
		if(!data?.length) return
		this.insertSubTitle('EDUCATION')
		console.log('Adding education')

		data.forEach(edu => {
			const { school, location, field, degree, degreeAbbr, gradDate } = edu

			this.shouldAddPage()

			const topPos = this.pdf.y + 12

			// Add right column info.
			this.pdf
				.font('Rubik-Medium.ttf')
				.fontSize(this.textSize)
			this.createColumnWithText(gradDate, topPos, 'right')

			// Add left column info.
			this.pdf
				.font('Rubik-Medium.ttf')
				.fontSize(this.textSize)
			this.createColumnWithText(`${field}, ${degreeAbbr}`, topPos, 'left')

			this.pdf.font('Rubik-Regular.ttf')
				.text(`${school}, ${location}`, this.pdf.x, this.pdf.y + 2)
		})
	}

	/**
	 * Inserts experiences with sub section title.
	 * @param {Array} data
	 */
	insertExperience(data) {
		if(!data?.length) return
		this.insertSubTitle('WORK EXPERIENCE')
		console.log('Adding work experience')

		for(let i in data) {
			const { company, title, workedBetween, location, type, achievements } = data[i]

			this.shouldAddPage()

			const topPos = this.pdf.y + 12

			// Add right column info.
			this.pdf
				.font('Rubik-Medium.ttf')
				.fontSize(this.textSize)
			this.createColumnWithText(workedBetween, topPos, 'right')

			// Add left column info.
			this.pdf
				.font('Rubik-Medium.ttf')
				.fontSize(this.textSize)
			this.createColumnWithText(company, topPos, 'left')

			this.pdf.font('Rubik-Regular.ttf')
				.text(title, this.pdf.x, this.pdf.y + 2)
				.text(location, this.pdf.x, this.pdf.y + 2)

			// Add achievements.
			achievements.forEach((text, i) => {
				const topPos = this.pdf.y + (!i ? 8 : 2)
				const leftPos = this.pdf.x + (!i ? 12 : 0)

				// Add bullet.
				this.pdf.rect(24, topPos + 4, 4, 4)
					.fillColor('black')
					.fill()

				// Add text.
				this.pdf.text(text, leftPos, topPos, 
					{ width: this.realW - leftPos, align: 'justify' }
				)
			})
		}
	}

	/**
	 * Inserts technical skills with grouping.
	 * @param {Array} data 
	 */
	insertSkills(data) {
		if(!data?.length) return
		this.shouldAddPage()
		this.insertSubTitle('SKILLS')
		console.log('Adding skills')
		
		data.forEach((data, i) => {
			const isFirst = !i
			const topPos = this.pdf.y + ((isFirst ? 12 : 2))

			this.pdf
				.font('Rubik-Medium.ttf')
				.fontSize(this.textSize)
				.text(`${data.label}: `, this.pdf.x, topPos, { continued: true, align: 'justify' })
			this.pdf
				.font('Rubik-Regular.ttf')
				.text(data.value, { continued: false })
			// data.data.forEach((skill, i) => {
			// 	const isLast = data.data.length === i + 1
			// 	this.pdf
			// 		.font('Rubik-Regular.ttf')
			// 		.text(skill, { continued: !isLast })
				
			// 	if(!isLast) {
			// 		this.pdf.text(', ', { continued: true })
			// 	}
			// })
		})
	}

	writeAndCompleteDocument() {
		this.pdf.end()
		console.log('Completing document')
		
		this.stream.on('finish', () => {
			const url = this.stream.toBlobURL('application/pdf')
			const elem = document.getElementById('resume-preview')
			elem.src = url
			this.stream = null
		})

		this.pdf = null
	}
}