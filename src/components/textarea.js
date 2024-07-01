'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Textarea {
	#config

	constructor(config) {
		this.#config = isConfigVerified('textarea', config) ? config : {}
	}

	create() {
		const { id, class_name, placeholder, text, readonly } = this.#config
		const TEXTAREA = this.#createContainer(
			id,
			class_name,
			placeholder,
			text,
			readonly
		)

		return TEXTAREA
	}

	remove() {
		const { id } = this.#config
		let TEXTAREA = document.getElementById(`textarea-${id}`)

		if (!TEXTAREA) return
		TEXTAREA.remove()
		TEXTAREA = null
	}

	lock() {
		const { id } = this.#config
		let TEXTAREA = document.getElementById(`textarea-${id}`)

		if (!TEXTAREA) return
		TEXTAREA.setAttribute('readonly', true)
	}

	unlock() {
		const { id } = this.#config
		let TEXTAREA = document.getElementById(`textarea-${id}`)

		if (!TEXTAREA) return
		TEXTAREA.removeAttribute('readonly')
	}

	#createContainer(id, class_name, placeholder, text, readonly) {
		if (!id) return

		const TEXTAREA = document.createElement('textarea')
		setAttributes(TEXTAREA, {
			id: `textarea-${id}`,
			class: `textarea-${class_name} textarea`.trim(),
			placeholder: placeholder
		})

		if (readonly) {
			TEXTAREA.setAttribute('readonly', true)
		}
		TEXTAREA.textContent = text

		return TEXTAREA
	}
}

export { Textarea }
