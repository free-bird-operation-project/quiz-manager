'use strict'

import { createContainer } from './button-create-container'
import { isConfigVerified } from '../../utilities/config/config-verifier'

function createButton(config) {
	if (!isConfigVerified(config)) return

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

export { createButton }
