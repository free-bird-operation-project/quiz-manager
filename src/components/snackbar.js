'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Snackbar {
	static #snackbar_queue = []
	static #is_displaying = false

	#config

	constructor(config) {
		this.#config = isConfigVerified('snackbar', config) ? config : {}
	}

	renderThenRemove() {
		const { message } = this.#config
		Snackbar.#enqueue(message)
	}

	static #enqueue(message) {
		Snackbar.#snackbar_queue.push(message)
		Snackbar.#processQueue()
	}

	static #processQueue() {
		if (Snackbar.#is_displaying || Snackbar.#snackbar_queue.length === 0) {
			return
		}

		Snackbar.#is_displaying = true
		const message = Snackbar.#snackbar_queue.shift()
		Snackbar.#display(message)
	}

	static #display(message) {
		const existing_snackbar = document.getElementById('snackbar')
		if (existing_snackbar) {
			existing_snackbar.remove()
		}

		const SNACKBAR = Snackbar.#create(message)
		document.body.appendChild(SNACKBAR)

		Snackbar.#remove(SNACKBAR)
	}

	static #create(message) {
		const SNACKBAR = document.createElement('div')
		setAttributes(SNACKBAR, {
			class: 'snackbar',
			id: 'snackbar'
		})
		SNACKBAR.textContent = message

		return SNACKBAR
	}

	static #remove(SNACKBAR) {
		let start
		const duration = 3000

		function animate(timestamp) {
			if (!start) start = timestamp

			const progress = timestamp - start

			if (progress > duration) {
				SNACKBAR.remove()
				SNACKBAR = null
				Snackbar.#is_displaying = false
				Snackbar.#processQueue()
				return
			}

			requestAnimationFrame(animate)
		}

		requestAnimationFrame(animate)
	}
}

export { Snackbar }
