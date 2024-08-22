import { sanitizeValue } from '@utilities/sanitize-value'

/**
 * @typedef {Object} SnackbarConfig
 * @property {string} message - The title of the snackbar.
 */

/**
 * Represents a Snackbar component.
 */
class Snackbar {
	static queue = []
	static isDisplaying = false

	/**
	 * Initializes the snackbar instance with the provided configuration.
	 *
	 * @param {SnackbarConfig} config - The configuration object for the snackbar.
	 */
	constructor(config) {
		this.config = sanitizeValue(config, 'object')
	}

	/**
	 * Renders the snackbar message and removes it after displaying.
	 */
	renderThenRemove() {
		const { message } = this.config
		Snackbar.#enqueue(message)
	}

	/**
	 * Adds a message to the snackbar queue and triggers the queue processing.
	 *
	 * @param {string} message - The message to be added to the queue.
	 */
	static #enqueue(message) {
		Snackbar.queue.push(message)
		Snackbar.#processQueue()
	}

	/**
	 * Processes the snackbar queue by displaying the next message in the queue if not already displaying a message.
	 */
	static #processQueue() {
		if (Snackbar.isDisplaying || Snackbar.queue.length === 0) {
			return
		}

		Snackbar.isDisplaying = true
		const message = Snackbar.queue.shift()
		Snackbar.#display(message)
	}

	/**
	 * Displays a snackbar message on the screen.
	 *
	 * @param {string} message - The message to be displayed in the snackbar.
	 */
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

	/**
	 * Removes the snackbar element after a specified duration by animating its removal.
	 *
	 * @param {Element} snackbar - The snackbar element to be removed.
	 */
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
