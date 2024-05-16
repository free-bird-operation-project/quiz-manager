const button = document.getElementById('learn-more')

button.addEventListener('click', () => {
	window.location.href =
		'https://github.com/free-bird-operation-project/quiz-manager'
})

const cursor = document.querySelector('.cursor')

document.addEventListener('mousemove', (e) => {
	cursor.setAttribute(
		'style',
		'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;'
	)
})

document.addEventListener('click', () => {
	cursor.classList.add('expand')

	setTimeout(() => {
		cursor.classList.remove('expand')
	}, 500)
})

const emoji = document.getElementById('emoji')
const emojiList = [
	'😀',
	'😉',
	'🥰',
	'🤗',
	'🥱',
	'🤠',
	'🧐',
	'😁',
	'😃',
	'😎',
	'😊',
	'😍',
	'🤩',
	'🙂',
	'😯',
	'🥹',
	'🫣',
	'🤓'
]

function changeEmoji() {
	const randomIndex = Math.floor(Math.random() * emojiList.length)
	const newEmoji = emojiList[randomIndex]

	emoji.style.transform = 'scale(0.1)'
	setTimeout(() => {
		emoji.textContent = newEmoji
		emoji.style.transform = 'scale(1)'
	}, 100)
}
changeEmoji()
setInterval(changeEmoji, 3000)
