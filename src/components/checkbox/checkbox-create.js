'use strict'

import { isConfigVerified } from '@utilities/config/config-verifier'
import { setAttributes } from '@utilities/components/set-attributes'

function createCheckbox(config) {
	if (!isConfigVerified('checkbox', config)) return

	const { id, class_name, target_id, group_name } = config

	const CHECKBOX = document.createElement('div')
	const icon_holder = document.createElement('i')
	setAttributes(CHECKBOX, {
		'id': id,
		'class': class_name,
		'data-state': false,
		'data-group-name': `${group_name}-checkboxes`,
		'data-target-id': target_id
	})
	setAttributes(icon_holder, {
		'data-lucide': 'square'
	})

	CHECKBOX.appendChild(icon_holder)
	return CHECKBOX
}

export { createCheckbox }
