'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { createSnackbar } from './snackbar-create'
import { removeSnackbar } from './snackbar-remove'

class Snackbar {
	constructor(config) {
		this.name = 'snackbar'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	create() {
		createSnackbar(this.config)
	}

	remove() {
		removeSnackbar(this.config)
	}
}

export { Snackbar }
