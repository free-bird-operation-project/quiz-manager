'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'

function removeCheckbox(config) {
	if (!isConfigVerified('checkbox', config)) return

	const { id } = config

	const CHECKBOX = document.getElementById(id)
	if (!CHECKBOX) return
	CHECKBOX.remove()

	removeLocalStorageCheckboxesItems()
}

function removeLocalStorageCheckboxesItems() {
	const suffix = '-checkboxes'

	for (let key in localStorage) {
		if (key.endsWith(suffix)) {
			localStorage.removeItem(key)
		}
	}
}

export { removeCheckbox }
