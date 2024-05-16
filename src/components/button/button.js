'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { createButton } from './button-create'
import { removeButton } from './button-remove'

class Button {
	constructor(config) {
		this.name = 'button'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	create() {
		createButton(this.config)
	}

	remove() {
		removeButton(this.config)
	}
}

export { Button }
