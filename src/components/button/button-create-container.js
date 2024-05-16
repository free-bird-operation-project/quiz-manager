'use strict'

import { setAttributes } from '../../utilities/components/set-attributes'
import { setEvents } from '../../utilities/components/set-events'

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

export { createContainer }
