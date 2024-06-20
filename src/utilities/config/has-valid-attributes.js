'use strict'

function hasValidAttributes(component, config) {
	if (!component) {
		console.error(`The ${component} is not found in the list.`)
		return false
	}

	if (!config || typeof config !== 'object') {
		console.error("The 'config' is not valid.")
		return false
	}

	const LIST_OF_VALID_ATTRIBUTES = [
		{ button: ['class_name', 'id', 'text', 'events', 'icon', 'type'] },
		{ tab: ['buttons'] },
		{ snackbar: ['message'] },
		{ checkbox: ['id', 'class_name', 'state', 'target_id', 'group_name'] },
		{ modal: ['id', 'title', 'icon', 'buttons'] },
		{ textarea: ['id', 'class_name', 'placeholder', 'text', 'readonly'] },
		{ page: ['elements', 'z_index', 'id'] }
	]

	const VALID_COMPONENTS = LIST_OF_VALID_ATTRIBUTES.find((list_object) =>
		list_object.hasOwnProperty(component)
	)

	if (!VALID_COMPONENTS) {
		console.error(`The ${component} is not found in the list.`)
		return false
	}

	const VALID_ATTRIBUTES = VALID_COMPONENTS[`${component}`]
	const CONFIG_KEYS = Object.keys(config)
	const INVALID_KEYS = CONFIG_KEYS.filter((KEY) => !VALID_ATTRIBUTES.includes(KEY))
	let flag = true

	if (INVALID_KEYS.length > 0) {
		INVALID_KEYS.forEach((INVALID_KEY) => {
			console.error(`The '${INVALID_KEY}' is not valid attribute for '${component}'.`)
			flag = false
		})
	}

	return flag
}

export { hasValidAttributes }
