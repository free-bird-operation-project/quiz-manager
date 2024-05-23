'use strict'

import { isConfigVerified } from '../../utilities/config/config-verifier'
import { setAttributes } from '../../utilities/components/set-attributes'

function createTextarea(config) {
	if (!isConfigVerified(config)) return

	const { id, class_name, placeholder, text, readonly } = config
	const TEXTAREA = createContainer(id, class_name, placeholder, text, readonly)

	return TEXTAREA
}

function createContainer(id, class_name, placeholder, text, readonly) {
	const TEXTAREA = document.createElement('textarea')
	setAttributes(TEXTAREA, {
		id: id,
		class: `${class_name} textarea`.trim(),
		placeholder: placeholder,
		readonly: readonly
	})
	TEXTAREA.textContent = text

	return TEXTAREA
}

export { createTextarea }
