const $themeSelect = document.querySelector('#themes')
const $optionSelect = document.querySelector('#rightOption')
const $allOptions = document.querySelectorAll('.option')
const $submit = document.querySelector('.submitQuestions')
const $question = document.querySelector('#question')
const $back = document.querySelector('.back')

window.addEventListener('load', () => {
	const auth = JSON.parse(localStorage.getItem('auth'))
	if (!auth || auth === false) {
		window.open('../auth.html', '_self')
	}
})

window.addEventListener('load', () => {
	const themes = JSON.parse(localStorage.getItem('themes'))
	if (themes) {
		const themeTemplate = themes
			.map((item) => {
				return `
				<option id="${item}">${item}</option>
			`
			})
			.join('')
		$themeSelect.innerHTML = themeTemplate
	}
})

let chosenTheme = 'math'
let rightAnswer = 'a'

$themeSelect.addEventListener('change', (e) => {
	chosenTheme = e.target.value
})

$optionSelect.addEventListener('change', (e) => {
	rightAnswer = e.target.value
})

$submit.addEventListener('click', (e) => {
	e.preventDefault()
	const database = JSON.parse(localStorage.getItem('quizData'))
	const question = newQuestion()
	if (!database[chosenTheme]) {
		database[chosenTheme] = []
		database[chosenTheme].push(question)
	} else {
		database[chosenTheme].push(question)
	}
	localStorage.setItem('quizData', JSON.stringify(database))
	window.location.reload()
})

$back.addEventListener('click', (e) => {
	e.preventDefault()
	window.open('../themes.html', '_self')
})

function newQuestion() {
	let obj = {}
	let areAllInputsFilledUp = true
	$allOptions.forEach(({ id, value }) => {
		if (value) {
			obj[id] = value
		} else {
			areAllInputsFilledUp = false
		}
	})
	if (areAllInputsFilledUp) {
		obj.question = $question.value
		obj.correct = rightAnswer
		return obj
	} else {
		console.error('ERROR')
	}
}
