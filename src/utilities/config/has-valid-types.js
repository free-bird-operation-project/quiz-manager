'use strict'

function hasValidTypes(config) {
	if (
		!config ||
		config === undefined ||
		Object.keys(config).length === 0 ||
		typeof config !== 'object'
	) {
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
		flag = validateValidTypes(VALID_TYPES_OBJECT, flag)
	}

	console.log(flag)
	return flag
}

function validateValidTypes(VALID_TYPES_OBJECT, flag) {
	for (const TYPE in VALID_TYPES_OBJECT) {
		const LIST_OF_ATTRIBUTES = VALID_TYPES_OBJECT[TYPE]
		flag = validateAttributesOfType(TYPE, LIST_OF_ATTRIBUTES, flag)
	}
	return flag
}

function validateAttributesOfType(TYPE, LIST_OF_ATTRIBUTES, flag) {
	for (const ATTRIBUTE in LIST_OF_ATTRIBUTES) {
		if (TYPE === 'array') {
			flag = validateArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES, flag)
		} else {
			flag = validateNonArrayAttribute(
				ATTRIBUTE,
				LIST_OF_ATTRIBUTES,
				TYPE,
				flag
			)
		}
	}
	return flag
}

function validateArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES, flag) {
	const IS_NOT_ARRAY = !Array.isArray(LIST_OF_ATTRIBUTES[ATTRIBUTE])
	const IS_UNDEFINED = LIST_OF_ATTRIBUTES[ATTRIBUTE] !== undefined

	if (IS_NOT_ARRAY && IS_UNDEFINED) {
		let actual_type = getActualType(LIST_OF_ATTRIBUTES[ATTRIBUTE])

		console.error(
			`The attribute '${ATTRIBUTE}' is '${actual_type}' not a type of 'array'.`
		)
		flag = false
	}
	return flag
}

function validateNonArrayAttribute(ATTRIBUTE, LIST_OF_ATTRIBUTES, TYPE, flag) {
	const IS_NOT_TYPE = typeof LIST_OF_ATTRIBUTES[ATTRIBUTE] !== TYPE
	const IS_UNDEFINED = LIST_OF_ATTRIBUTES[ATTRIBUTE] !== undefined

	if (IS_NOT_TYPE && IS_UNDEFINED) {
		let actual_type = getActualType(LIST_OF_ATTRIBUTES[ATTRIBUTE])

		console.error(
			`The attribute '${ATTRIBUTE}' is '${actual_type}' not a type of '${TYPE}'.`
		)
		flag = false
	}
	return flag
}

function getActualType(attribute) {
	if (Array.isArray(attribute)) return 'array'
	return typeof attribute
}

export { hasValidTypes }
