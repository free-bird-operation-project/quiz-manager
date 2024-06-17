'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Tab {
	#config

	constructor(config) {
		this.#config = isConfigVerified('tab', config) ? config : {}
	}

	create() {
		const { buttons } = this.#config

		const TAB = this.#createContainer(buttons)

		return TAB
	}

	remove() {
		let TAB = document.getElementById('tab')

		let { buttons } = this.#config

		if (!buttons) return

		this.#removeButtonsEvents(buttons)

		if (!TAB) return
		TAB.remove()
		TAB = null
	}

	#createContainer(buttons) {
		const raw_container = document.createElement('div')
		setAttributes(raw_container, {
			class: `tab`,
			id: 'tab'
		})

		const modified_buttons = this.#modifyButtons(buttons)

		const TAB = this.#createButtonsContainer(raw_container, modified_buttons)

		return TAB
	}

	#createButtonsContainer(container, buttons) {
		buttons.forEach((button) => {
			container.appendChild(button)
		})

		return container
	}

	#modifyButtons(buttons) {
		const button_array = []

		buttons.forEach((button, index) => {
			button.id = `tab-button-${index}`
			button_array.push(button)
		})

		return button_array
	}

	#removeButtonsEvents(buttons) {
		buttons.forEach((button) => {
			const clone_button = button.cloneNode(true)
			button.replaceWith(clone_button)
			button = null
		})
	}
}

export { Tab }
