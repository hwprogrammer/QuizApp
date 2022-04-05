const $quizContainer = document.querySelector('.card')
const $question = document.querySelector('.cardQuestion')
const $answerRadio = document.querySelectorAll('.answer')
const $a_answer = document.querySelector('.a_answer')
const $b_answer = document.querySelector('.b_answer')
const $c_answer = document.querySelector('.c_answer')
const $d_answer = document.querySelector('.d_answer')
const $submit = document.querySelector('.submitBtn')
const $back = document.querySelector('.back')
const $deleteTheme = document.querySelector('.deleteTheme')
const $pagination = document.querySelector('.pagination')

let currentQuiz = 0
let score = 0

window.addEventListener('load', () => {
	const auth = JSON.parse(localStorage.getItem('auth'))
	if (!auth || auth === false) {
		window.open('../auth.html', '_self')
	}
})

window.addEventListener('load', () => {
	const chosenTheme = JSON.parse(localStorage.getItem('theme'))
	if (chosenTheme) {
	} else {
		window.open('../themes.html', '_self')
	}
})

const theme = JSON.parse(localStorage.getItem('theme'))
const database = JSON.parse(localStorage.getItem('quizData'))
const dbLocalQuizData = database[theme]

function renderQuestion() {
	deselectInput()
	if (dbLocalQuizData) {
		const { a, b, c, d, question } = dbLocalQuizData[currentQuiz]
		$pagination.innerHTML = `${currentQuiz} / ${dbLocalQuizData.length}`
		$question.innerHTML = question
		$a_answer.innerHTML = a
		$b_answer.innerHTML = b
		$c_answer.innerHTML = c
		$d_answer.innerHTML = d
	} else {
		$question.innerHTML = `<h3>Добавьте пожалуйста вопросы</h3>`
		$a_answer.innerHTML = ''
		$b_answer.innerHTML = ''
		$c_answer.innerHTML = ''
		$d_answer.innerHTML = ''
		$answerRadio.forEach((item) => {
			item.style.display = 'none'
		})
		$submit.innerHTML =
			'<span onclick="addQuestionsFromTest()">Добавить вопросы</span>'
	}
}
renderQuestion()

function addQuestionsFromTest() {
	window.open('../admin.html', '_self')
}

function selctedAnswer() {
	let answer = null
	$answerRadio.forEach((item) => {
		if (item.checked) {
			answer = item.id
		}
	})
	return answer
}

function deselectInput() {
	$answerRadio.forEach((item) => {
		item.checked = false
	})
}

function lastQuestion() {
	return `
		<h2>Вы ответили на ${score} из ${dbLocalQuizData.length} вопросов правильно!</h2>
		<button onclick="showMeRightAnswers()">Показать ответы</button>
	`
}
const myAnswers = []
$submit.addEventListener('click', (e) => {
	e.preventDefault()
	const answer = selctedAnswer()
	if (answer) {
		myAnswers.push(answer)
		if (answer === dbLocalQuizData[currentQuiz].correct) {
			score++
		}
		currentQuiz++
		if (currentQuiz < dbLocalQuizData.length) {
			renderQuestion()
		} else {
			$quizContainer.innerHTML = lastQuestion()
		}
	} else {
		$question.style.color = '#99191a'
	}
})

function showMeRightAnswers() {
	$quizContainer.classList.add('show')
	const template = dbLocalQuizData
		.map(({ a, b, c, d, question, correct }, index) => {
			return finishedTemplate(a, b, c, d, question, index, correct)
		})
		.join('')
	$quizContainer.innerHTML = template
	$quizContainer.insertAdjacentHTML(
		'beforeend',
		`<button class="resetQuiz" onclick="resetQuiz()">Начать заново</button>`
	)
	$quizContainer.insertAdjacentHTML(
		'beforeend',
		`<button class="chooseTheme" onclick="chooseTheme()">Выбрать тему</button>`
	)
}

function chooseTheme() {
	localStorage.removeItem('theme')
	window.open('../themes.html', '_self')
}

function resetQuiz() {
	window.location.reload()
}

function finishedTemplate(a, b, c, d, question, index, correct) {
	return `
			<div class="rightQuestionContainer"></div>
			<h4 class="showQuestion">${++index}) ${question}</h4>
			<ul class="showList">
				<li>
					${a}
				</li>
				<li>
					${b}
				</li>
				<li>
					${c}
				</li>
				<li>
					${d}
				</li>
			</ul>
			<h5 class="showCorrect">correct answer: ${correct}</h5>
			<h5 class="showChosen">You chose: ${myAnswers[--index]}</h5>
		`
}

$back.addEventListener('click', (e) => {
	e.preventDefault()
	window.open('../themes.html', '_self')
})

$deleteTheme.addEventListener('click', (e) => {
	e.preventDefault()
	const database = JSON.parse(localStorage.getItem('quizData'))
	const themes = JSON.parse(localStorage.getItem('themes'))
	const deletedThemeArray = themes.filter((item) => {
		return item !== theme
	})
	delete database[theme]
	localStorage.setItem('themes', JSON.stringify(deletedThemeArray))
	localStorage.setItem('quizData', JSON.stringify(database))
	window.open('../themes.html', '_self')
})
