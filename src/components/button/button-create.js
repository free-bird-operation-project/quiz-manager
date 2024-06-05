'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

function createButton(config) {
	if (!isConfigVerified('button', config)) return

	const { type, id, class_name, icon } = config
	let { text } = config

	let button

	switch (type) {
		case 'rounded-square':
			text = undefined
			button = createContainer(icon, text, id, class_name, 'rounded-square')
			break
		case 'slab':
			if (!text && !icon) return
			button = createContainer(icon, text, id, class_name, 'slab')
			break
		default:
			if (!text && !icon) return
			button = createContainer(icon, text, id, class_name, 'transparent')
	}

	return button
}

function createContainer(icon, text, id, class_name, type) {
	const BUTTON = document.createElement('div')
	setAttributes(BUTTON, {
		id: `button-${id}`,
		class: `${class_name} button ${type}-button`.trim()
	})

	if (icon) {
		const ICON_WRAPPER = document.createElement('i')

		setAttributes(ICON_WRAPPER, {
			'data-lucide': icon
		})

		BUTTON.appendChild(ICON_WRAPPER)
	}

	if (text) {
		const TEXT = document.createElement('p')
		TEXT.textContent = text

		BUTTON.appendChild(TEXT)
	}

	return BUTTON
}

export { createButton }
