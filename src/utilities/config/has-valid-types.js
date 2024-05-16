'use strict'

function hasValidTypes(config) {
	if (!config || config === undefined || Object.keys(config).length === 0) {
		console.error("Make sure the 'config' is not empty.")
		return false
	}

	const { id, class_name, text, icon, type, events, buttons } = config
	let flag = true
	const LIST_OF_VALID_TYPES = [
		{
			string: {
				id: id,
				class_name: class_name,
				text: text,
				icon: icon,
				type: type
			}
		},
		{
			array: {
				events: events,
				buttons: buttons
			}
		}
	]

	for (const VALID_TYPES_OBJECT of LIST_OF_VALID_TYPES) {
		validateValidTypes(VALID_TYPES_OBJECT)
	}

	function validateValidTypes(VALID_TYPES_OBJECT) {
		for (const TYPE in VALID_TYPES_OBJECT) {
			const LIST_OF_ATTRIBUTES = VALID_TYPES_OBJECT[TYPE]
			validateAttributesOfType(TYPE, LIST_OF_ATTRIBUTES)
		}
	}

	function validateAttributesOfType(TYPE, LIST_OF_ATTRIBUTES) {
		for (const ATTRIBUTE in LIST_OF_ATTRIBUTES) {
			if (TYPE === 'array') {
				validateArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES)
			} else {
				validateNonArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES, TYPE)
			}
		}
	}

	function validateArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES) {
		const IS_NOT_ARRAY = !Array.isArray(LIST_OF_ATTRIBUTES[ATTRIBUTE])
		const IS_UNDEFINED = LIST_OF_ATTRIBUTES[ATTRIBUTE] !== undefined

		if (IS_NOT_ARRAY && IS_UNDEFINED) {
			let actual_type = getActualType(LIST_OF_ATTRIBUTES[ATTRIBUTE])

			console.error(
				`The attribute '${ATTRIBUTE}' is '${actual_type}' not a type of 'array'.`
			)
			flag = false
		}
	}

	function validateNonArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES, TYPE) {
		const IS_NOT_TYPE = typeof LIST_OF_ATTRIBUTES[ATTRIBUTE] !== TYPE
		const IS_UNDEFINED = LIST_OF_ATTRIBUTES[ATTRIBUTE] !== undefined

		if (IS_NOT_TYPE && IS_UNDEFINED) {
			let actual_type = getActualType(LIST_OF_ATTRIBUTES[ATTRIBUTE])

			console.error(
				`The attribute '${ATTRIBUTE}' is '${actual_type}' not a type of '${TYPE}'.`
			)
			flag = false
		}
	}

	function getActualType(attribute) {
		if (Array.isArray(attribute)) return 'array'
		return typeof attribute
	}

	return flag
}

export { hasValidTypes }
