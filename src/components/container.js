'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Container {
	#config

	constructor(config) {
		this.#config = isConfigVerified('container', config) ? config : {}
	}

	create() {
		const { id, class_name, elements, text } = this.#config
		const CONTAINER = document.createElement('div')
		setAttributes(CONTAINER, {
			id: `${id}`,
			class: `${class_name}`
		})

		if (elements) {
			this.#appendElements(elements, CONTAINER)
		}

		if (text) {
			this.#appendText(text, CONTAINER)
		}

		return CONTAINER
	}

	remove() {
		const { id } = this.#config
		if (!id) return

		let CONTAINER = document.getElementById(`${id}`)

		if (!CONTAINER) return

		CONTAINER.remove()
		CONTAINER = null
	}

	#appendElements(elements, container) {
		elements.forEach((element) => {
			container.appendChild(element)
		})
	}

	#appendText(text, container) {
		container.textContent = text
	}
}

export { Container }
