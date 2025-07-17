'use client'

import PDFKit from '@react-pdf/pdfkit'
import blobStream from 'blob-stream'

const mockDocument = {
	name: 'Ceyhun Çarpar',
	personalInfo: {
		phone: { type: 'text', value: '+90 538 684 71 55' },
		email: { type: 'link', value: 'ceyhuncarpar@gmail.com' },
		linkedin: { type: 'link', value: 'linkedin.com/in/ceyhuncarpar' },
		github: { type: 'link', value: 'github.com/ceyhuncarpar' }
	},
	summary: 'Passionate software developer with experience building full-stack web and mobile applications using React, React Native, Node.js, and MongoDB. Experienced in working with multi-cultural remote teams, leading and mentoring team mates with the goal of bringing digital product ideas into functioning real life applications.',
	education: [
		{
			school: 'Ege University',
			location: 'Izmir, Turkey',
			field: 'Film and Television Studies',
			degree: 'Bachelor of Arts',
			degreeAbbr: 'BA',
			gradDate: 'June 2020'
		},
		{
			school: 'ODTU',
			location: 'Ankara, Turkey',
			field: 'Software Engineering',
			degree: 'Bachelor of Engineering',
			degreeAbbr: 'BE',
			gradDate: 'June 2024'
		}
	],
	experiences: [
		{
			company: 'Marga',
			title: 'Full-Stack developer',
			workedBetween: 'Oct 2024 - Feb 2025',
			location: 'Remote',
			type: 'Full time',
			achievements: [
				'Marga application is the companion app of Marga holistic well-being program, with the modern approach to bringing patients and doctors/consultants together with specifically tailored mobile and web experiences for each user role.',
				'Had a key role in technological and architectural decision making, grounding the foundations for important modules such as chat, availability calendar, role based view rendering and data fetching for other team members to participate in.',
				'Developed backend REST APIs for various modules including inventory, chat and calendar availability with Express.js. Stored data within MongoDB database and sent real time updates when necessary with socket.io web socket gateways.',
				'Ensured global timezone consistency with date-fns-tz, granting doctors/consultants the ability of assigning time specific tasks to patients while respecting their timezones.',
				'Ported the latest web app version to Electron.js, and successfully uploaded to App Store.',
				'Oversaw the deployment to App Store and Play Store.'
			]
		},
		{
			company: 'Playaz4Playaz',
			title: 'Lead Full-Stack Developer',
			workedBetween: 'Mar 2022 - Aug 2023',
			location: 'Remote',
			type: 'Full time',
			achievements: [
				'Took on the responsibility of leading the development team of this sports-related social media platform, targeting to create a community of fans and athletes of all professional levels.',
				'Worked with a compact team of developers on a tight dead line. Took the responsibility of overseeing the technical decision making, task execution and product and code quality, ensured product team decisions were accurately reflected in regular app updates by maintaining a consistent staging environment and TestFlight updates.',
				'Built a custom live sports game event module by customizing the open-source theSportsDB API, cutting operational costs of by not depending on expensive services for the early production and staging phases.',
				'Developed a secured download and upload infrastructure with AWS S3 SDK. Used preresigned media and upload URLs to block visibility for unauthorized users.',
				'Oversaw the development of a one-on-one video conferencing module with WebRTC, adapted media streaming to mobile devices with react-native-webrtc.'
			]
		},
		{
			company: 'UniStack',
			title: 'Full-Stack Developer',
			workedBetween: 'Mar 2021 - Feb 2022',
			location: 'Remote',
			type: 'Full time',
			achievements: [
				'Contributed to the fast-paced development environment for this CRM and SMS marketing platform, adapting to product changes on daily basis to ensure each module are up to product standards.',
				'Designed and developed a mobile application using React Native, ensuring a cohesive UI/UX with the already existing web application.',
				'Delivered 30+ live bug fixes in production for both Express.js back-end and React.js front-end modules, utilized the power of pm2 process manager to minimize downtimes.'
			]
		},
		{
			company: 'GameTree',
			title: 'Fron-End Developer',
			workedBetween: 'Jul 2021 - Sep 2021',
			location: 'Remote',
			type: 'Contract',
			achievements: [
				'Participated in the development of the voice chat module, leveraging the power of WebRTC with STUN/TURN servers hosted on xirsys to bring a group of players within a voice chat room.',
				'Built the UI/UX with for voice chat module with styled-components and data stored within redux and redux-persist.'
			],
		},
		{
			company: 'Trally',
			title: 'Full-Stack Developer',
			workedBetween: 'Aug 2020 - Feb 2021',
			location: 'Remote',
			type: 'Full time',
			achievements: [
				'Developed back-end services and database interactions for a travel event streaming-based social media platform using Node.js and Express.js, with MongoDB as the database. Additionally, created connected front-end applications using React.js for web and React Native for mobile',
				'Enabled location-based travel event search queries using the Google Places API, associating each event with location coordinates and generating search results through geospatial queries with MongoDB.',
				'Implemented a custom UI component library with styled-components, translating Figma designs into nearly 30 reusable components to maintain visual and code consistency.',
				'Connected Stripe for event payments and customer tracking, attached to it’s own billing module residing within the app.'
			]
		},
		{
			company: 'CoProductivity',
			title: 'Front-End Developer',
			workedBetween: 'June 2018 - July 2020',
			location: 'Remote',
			type: 'Full time',
			achievements: [
				'Built a chat module with React Native for an existing mobile application.',
				'Designed and developed a data tracing single page application with React, Redux, axios and styled-components, where imported data is traced via an outside API and the results are converted into a new list in .csv format for end user to download.',
				'Assisted in the development of responsive websites and product stores using WordPress, HTML, CSS, and JavaScript, gaining foundational experience in web development and design principles. Later on developed 5 unique websites using React.'
			]
		}
	],
	skills: [
		{
			title: 'Languages',
			data: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
		},
		{
			title: 'Frameworks & Libraries',
			data: ['React.js', 'Next.js', 'React Native', 'Redux', 'Node.js', 'Express.js', 'Socket.io', 'Jest', 'axios', 'styled-components', 'Tailwind CSS', 'WebRTC']
		},
		{
			title: 'Platforms',
			data: ['Google Cloud Console', 'Google Firebase', 'AWS S3', 'Digital Ocean', 'App Store Connect', 'Google Play Console']
		},
		{
			title: 'Tools',
			data: ['XCode', 'Android Studio', 'Git', 'Figma', 'Canva', 'MongoDB Compass']
		}

	]
}

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
		console.log('---------------------------------------------------------------------------------')
		console.log(documentData)
		console.log('---------------------------------------------------------------------------------')
		console.log('Generating document')
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

				case 'experiences':
					this.insertExperiences(value)		
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
			const values = data[key]
			const { value, type } = values || {}
			const isLast = keys.length === i + 1
			if(!value) return

			this.pdf.text(
				value,
				this.pdf.x,
				// Add top margin from header
				i === 0 ? this.pdf.y + 4 : this.pdf.y,
				{ 
					link: type === 'link' && value, 
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
	insertExperiences(data) {
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
			const title = data.title
			const isFirst = !i
			const topPos = this.pdf.y + (isFirst ? 12 : 2)

			this.pdf
				.font('Rubik-Medium.ttf')
				.fontSize(this.textSize)
				.text(`${title}: `, this.margins.left, topPos,
					{ continued: true }
				)

			data.data.forEach((skill, i) => {
				const isLast = data.data.length === i + 1
				this.pdf
					.font('Rubik-Regular.ttf')
					.text(skill, { continued: !isLast })
				
				if(!isLast) {
					this.pdf.text(', ', { continued: true })
				}
			})
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