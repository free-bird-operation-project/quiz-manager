'use strict'

import { setAttributes } from '@utilities/components/set-attributes'
import { isConfigVerified } from '@utilities/config/config-verifier'

function renderSnackbar(config) {
	if (!isConfigVerified('snackbar', config)) return

	const { message } = config

	return manageSnackbar().displaySnackbar(message)
}

function manageSnackbar() {
	const snackbar_queue = []

	function displaySnackbar(message) {
		const is_snackbar = document.getElementById('snackbar')

		if (is_snackbar) {
			snackbar_queue.push(message)
			return
		}

		const SNACKBAR = createSnackbar(message)
		document.body.appendChild(SNACKBAR)

		removeSnackbar(SNACKBAR)
	}

	function createSnackbar(message) {
		const SNACKBAR = document.createElement('div')
		setAttributes(SNACKBAR, {
			class: 'snackbar',
			id: 'snackbar'
		})
		SNACKBAR.textContent = message

		return SNACKBAR
	}

	function removeSnackbar(SNACKBAR) {
		setTimeout(() => {
			SNACKBAR.remove()

			if (snackbar_queue.length > 0) {
				const next_message = snackbar_queue.shift()
				displaySnackbar(next_message)
			}
		}, 3000)
	}

	return { displaySnackbar }
}

export { renderSnackbar }
