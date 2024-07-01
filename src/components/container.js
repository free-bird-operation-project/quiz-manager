'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

class Container {
	#config

	constructor(config) {
		this.#config = isConfigVerified('container', config) ? config : {}
	}

	create() {
		const { id, class_name } = this.#config
		const CONTAINER = document.createElement('div')
		setAttributes(CONTAINER, {
			id: `${id}`,
			class: `${class_name}`
		})
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
}

export { Container }
