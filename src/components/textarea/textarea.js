'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { createTextarea } from './textarea-create'
import { removeTextarea } from './textarea-remove'

class Textarea {
	constructor(config) {
		this.name = 'textarea'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	create() {
		createTextarea(this.config)
	}

	remove() {
		removeTextarea(this.config)
	}
}

export { Textarea }
