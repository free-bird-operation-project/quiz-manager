'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { setAttributes } from '../../utilities/components/set-attributes'
import { setEvents } from '../../utilities/components/set-events'

function createButton(config) {
	if (!isConfigVerified('button', config)) return

	const { type, id, class_name, icon, text, events } = config
	let button

	switch (type) {
		case 'rounded-square':
			text = undefined
			button = createContainer(
				icon,
				text,
				id,
				class_name,
				events,
				'rounded-square'
			)
			break
		case 'slab':
			if (!text && !icon) return
			button = createContainer(icon, text, id, class_name, events, 'slab')
			break
		default:
			if (!text && !icon) return
			button = createContainer(
				icon,
				text,
				id,
				class_name,
				events,
				'transparent'
			)
	}

	return button
}

function createContainer(icon, text, id, class_name, events, type) {
	if (!events) {
		console.error('Button is useless without events.')
		return
	}

	const BUTTON = document.createElement('div')
	setAttributes(BUTTON, {
		id: `button-${id}`,
		class: `${class_name} button ${type}-button`.trim()
	})

	if (icon) {
		const ICON_WRAPPER = document.createElement('div')

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

	setEvents(events)
	return BUTTON
}

export { createButton }
