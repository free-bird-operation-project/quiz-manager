'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { createModal } from './modal-create'
import { removeModal } from './modal-remove'

class Modal {
	constructor(config) {
		this.name = 'modal'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	create() {
		createModal(this.config)
	}

	remove() {
		removeModal(this.config)
	}
}

export { Modal }
