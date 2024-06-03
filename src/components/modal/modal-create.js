'use strict'

import { setAttributes } from '@utilities/components/set-attributes'
import { isConfigVerified } from '@utilities/config/config-verifier'

function createModal(config) {
	if (!isConfigVerified(config)) return

	const { id, title, icon, buttons } = config
	const MODAL = createModalContainer(id, title, icon, buttons)

	return MODAL
}

function createModalContainer(id, title, icon, buttons) {
	const MODAL = document.createElement('div')
	setAttributes(MODAL, {
		id: id,
		class: 'modal'
	})

	const BUTTONS = createModalButtons(buttons)
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

function createModalButtons(buttons) {
	let BUTTONS = []

	buttons.forEach((button, index) => {
		button.id = `modal-button-${index}`
		BUTTONS.push(button)
	})

	return BUTTONS
}

export { createModal }
