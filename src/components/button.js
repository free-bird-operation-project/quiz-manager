'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setEvents } from '@utilities/components/set-events'
import { setAttributes } from '@utilities/components/set-attributes'
import { removeEvents } from '@utilities/components/remove-events'

class Button {
	#config

	constructor(config) {
		this.#config = isConfigVerified('button', config) ? config : {}
	}

	create() {
		const { type, id, class_name, icon, events } = this.#config
		let { text } = this.#config

		const node = this.#createNode(icon, text, id, class_name, type)
		const BUTTON = setEvents(node, events)

		return BUTTON
	}

	remove() {
		const { id, events } = this.#config
		if (!id) return
		if (!events) return

		let BUTTON = document.getElementById(`button-${id}`)

		if (!BUTTON) return

		removeEvents(BUTTON, events)
		BUTTON.remove()
		BUTTON = null
	}

	#createNode(icon, text, id, class_name, type) {
		let node

		switch (type) {
			case 'rounded-square':
				text = undefined
				node = this.#createContainer(icon, text, id, class_name, 'rounded-square')
				break
			case 'slab':
				if (!text && !icon) return
				node = this.#createContainer(icon, text, id, class_name, 'slab')
				break
			default:
				if (!text && !icon) return
				node = this.#createContainer(icon, text, id, class_name, 'transparent')
		}

		return node
	}

	#createContainer(icon, text, id, class_name, type) {
		const BUTTON = document.createElement('div')
		setAttributes(BUTTON, {
			id: `button-${id}`,
			class: `${class_name} button ${type}-button`.trim()
		})

		if (icon) {
			const ICON_WRAPPER = this.#createIcon(icon)
			BUTTON.appendChild(ICON_WRAPPER)
		}

		if (text) {
			const TEXT = this.#createText(text)
			BUTTON.appendChild(TEXT)
		}

		return BUTTON
	}

	#createIcon(icon) {
		const ICON_WRAPPER = document.createElement('i')
		setAttributes(ICON_WRAPPER, {
			'data-lucide': icon
		})

		return ICON_WRAPPER
	}

	#createText(text) {
		const TEXT = document.createElement('p')
		TEXT.textContent = text

		return TEXT
	}
}

export { Button }
