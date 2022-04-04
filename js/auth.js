const $email = document.querySelector('.email')
const $password = document.querySelector('.password')
const $login = document.querySelector('.login')

window.addEventListener('load', () => {
	const auth = JSON.parse(localStorage.getItem('auth'))
	if (!auth) {
		localStorage.setItem('auth', JSON.stringify(false))
	} else {
		if (auth === true) {
			window.open('../themes.html', '_self')
		}
	}
})

$login.addEventListener('click', (e) => {
	e.preventDefault()
	if ($email.value.length === 0 || $password.value.length === 0) {
		console.log('not access')
		$email.style.boxShadow = 'inset 0 0 7px red'
		$password.style.boxShadow = 'inset 0 0 7px red'
		$email.value = ''
		$password.value = ''
	} else {
		if ($email.value === 'admin' && $password.value === 'admin') {
			$email.style.boxShadow = 'inset 0 0 7px green'
			$password.style.boxShadow = 'inset 0 0 7px green'
			localStorage.setItem('auth', JSON.stringify(true))
			setInterval(() => {
				window.open('../themes.html', '_self')
			}, 1000)
		}
	}
})
