'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { renderThenRemoveSnackbar } from './snackbar-render-then-remove'

class Snackbar {
	constructor(config) {
		this.name = 'snackbar'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	renderThenRemove() {
		renderThenRemoveSnackbar(this.config)
	}
}

export { Snackbar }
