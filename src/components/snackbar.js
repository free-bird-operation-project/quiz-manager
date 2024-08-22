import { sanitizeValue } from '@utilities/sanitize-value'

class Snackbar {
	static queue = []
	static isDisplaying = false

	constructor(config) {
		this.config = sanitizeValue(config, 'object')
	}

	renderThenRemove() {
		const { message } = this.config
		Snackbar.#enqueue(message)
	}

	static #enqueue(message) {
		Snackbar.queue.push(message)
		Snackbar.#processQueue()
	}

	static #processQueue() {
		if (Snackbar.isDisplaying || Snackbar.queue.length === 0) {
			return
		}

		Snackbar.isDisplaying = true
		const message = Snackbar.queue.shift()
		Snackbar.#display(message)
	}

	static #display(message) {
		const isSnackbar = document.getElementById('snackbar')

		if (isSnackbar) {
			isSnackbar.remove()
		}

		const snackbar = document.createElement('div')
		snackbar.classList.add('snackbar')
		snackbar.id = snackbar

		snackbar.textContent = message
		document.body.appendChild(snackbar)

		Snackbar.#remove(snackbar)
	}

	static #remove(snackbar) {
		let start
		const duration = 3000

		function animate(timestamp) {
			if (!start) start = timestamp

			const progress = timestamp - start

			if (progress > duration) {
				snackbar.remove()
				snackbar = null
				Snackbar.isDisplaying = false
				Snackbar.#processQueue()
				return
			}

			requestAnimationFrame(animate)
		}

		requestAnimationFrame(animate)
	}
}

export { Snackbar }
