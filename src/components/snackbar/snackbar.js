'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { renderSnackbar } from './snackbar-render'
import { removeSnackbar } from './snackbar-remove'

class Snackbar {
	constructor(config) {
		this.name = 'snackbar'
		this.config = isConfigVerified(this.name, config) ? config : {}
	}

	render() {
		renderSnackbar(this.config)
	}

	remove() {
		removeSnackbar()
	}
}

export { Snackbar }
