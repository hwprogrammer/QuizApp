const quizData = {
	english: [
		{
			id: 1,
			question: 'This is … orange ball.',
			a: 'a',
			b: 'an',
			c: 'the',
			d: '-',
			correct: 'b',
		},
		{
			id: 2,
			question: 'I will be back … 7 o’clock in the evening.',
			a: 'in',
			b: 'on',
			c: 'at',
			d: 'buy',
			correct: 'c',
		},
		{
			id: 3,
			question: '… Pacific ocean is the most dangerous.',
			a: 'a',
			b: 'an',
			c: 'the',
			d: '-',
			correct: 'c',
		},
	],
	math: [
		{
			id: 1,
			question: '2 + 2',
			a: '22',
			b: '4',
			c: '2',
			d: '-',
			correct: 'b',
		},
		{
			id: 2,
			question: 'корень 64',
			a: '8',
			b: '16',
			c: '5',
			d: '20',
			correct: 'a',
		},
		{
			id: 3,
			question: 'sin30deg?',
			a: '1',
			b: '0',
			c: '1/2',
			d: '-1',
			correct: 'c',
		},
	],
	bio: [
		{
			id: 1,
			question: 'How many kingdoms are there in the world?',
			a: '1',
			b: '2',
			c: '3',
			d: '5',
			correct: 'd',
		},
		{
			id: 2,
			question: 'Which blat cell curl up the blood at the wound?',
			a: 'trombocite',
			b: 'leikocite',
			c: 'Eritrocite',
			d: 'Fagocite',
			correct: 'a',
		},
		{
			id: 3,
			question: 'Who is a human',
			a: 'Ruslan',
			b: 'Aziz',
			c: 'Timur',
			d: 'Abdull',
			correct: 'd',
		},
	],
}

const $cardContainer = document.querySelector('.card-container')
const themes = ['math', 'bio', 'english']
const $addTheme = document.querySelector('.addTheme')
const $addQuestions = document.querySelector('.addQuestions')

window.addEventListener('load', () => {
	const auth = JSON.parse(localStorage.getItem('auth'))
	if (!auth || auth === false) {
		window.open('../auth.html', '_self')
	} else {
	}
})

window.addEventListener('load', () => {
	const dbFromLocal = localStorage.getItem('quizData')
	if (dbFromLocal) {
		return
	} else {
		localStorage.setItem('quizData', JSON.stringify(quizData))
		window.location.reload()
	}
})

window.addEventListener('load', () => {
	const allThemes = JSON.parse(localStorage.getItem('themes'))
	if (allThemes) {
		themeTemplate(allThemes)
	} else {
		localStorage.setItem('themes', JSON.stringify(themes))
		window.location.reload()
	}
})

function themeTemplate(database) {
	const template = database
		.map((item) => {
			return `
			<div class="card theme" id="${item}" onclick="chooseTheme('${item}')">
				<h3>${item}</h3>
			</div>
		`
		})
		.join('')
	$cardContainer.innerHTML = template
}

function chooseTheme(item) {
	localStorage.setItem('theme', JSON.stringify(item))
	window.open('./index.html', '_self')
}

$addTheme.addEventListener('click', (e) => {
	e.preventDefault()
	const newTheme = prompt('new theme')
	if (newTheme) {
		const themes = JSON.parse(localStorage.getItem('themes'))
		const allThemes = [...themes, newTheme]
		localStorage.setItem('themes', JSON.stringify(allThemes))
		window.location.reload()
	}
})

$addQuestions.addEventListener('click', (e) => {
	e.preventDefault()
	window.open('../admin.html', '_self')
})
