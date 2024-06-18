'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Modal {
	#config

	constructor(config) {
		this.#config = isConfigVerified('modal', config) ? config : {}
	}

	create() {
		const { id, title, icon, buttons } = this.#config
		const MODAL = this.#createModalContainer(id, title, icon, buttons)

		return MODAL
	}

	remove() {
		const { id, buttons } = this.#config

		if (id && document.getElementById(id)) {
			const MODAL = document.getElementById(id)

			this.#removeButtonsEvents(buttons)

			MODAL.remove()
		}
	}

	#createModalContainer(id, title, icon, buttons) {
		const MODAL = document.createElement('div')
		setAttributes(MODAL, {
			id: id,
			class: 'modal'
		})

		const BUTTONS = this.#modifyButtons(buttons)
		const title_container = document.createElement('div')
		const icon_holder = document.createElement('i')
		const title_text = document.createElement('p')

		setAttributes(icon_holder, {
			'data-lucide': icon
		})

		title_text.textContent = title
		title_container.appendChild(icon_holder)
		title_container.appendChild(title_text)
		MODAL.appendChild(title_container)

		BUTTONS.forEach((button) => {
			MODAL.appendChild(button)
		})

		return MODAL
	}

	#modifyButtons(buttons) {
		const button_array = []

		buttons.forEach((button, index) => {
			button.id = `modal-button-${index}`
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

export { Modal }
